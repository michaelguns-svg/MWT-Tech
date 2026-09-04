"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";

export type BlogFormProps = {
  /** Pass an id to switch the form into edit mode (pre-filled, PUTs to an existing post). Omit for create mode. */
  postId?: string;
  initialTitle?: string;
  initialContent?: string;
  /** URL of the post's existing saved image, if any (edit mode only). */
  initialImageUrl?: string;
};

export function BlogForm({ postId, initialTitle = "", initialContent = "", initialImageUrl }: BlogFormProps) {
  const isEditing = Boolean(postId);

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [image, setImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(initialImageUrl ?? null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Build (and clean up) a local preview URL whenever a new image is chosen.
  useEffect(() => {
    if (!image) {
      setNewImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(image);
    setNewImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  // Whatever should currently be shown in the preview box: a newly-picked
  // file takes priority, otherwise fall back to the post's existing image.
  const imagePreview = newImagePreview ?? existingImageUrl;

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setImage(file);
  }

  function clearImage() {
    setImage(null);
    setExistingImageUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setErrorMessage("");

    const payload = new FormData();
    payload.append("title", title);
    payload.append("content", content);
    if (image) payload.append("image", image);

    try {
      // TODO: these endpoints don't exist yet — point them at your real
      // backend once the storage/auth setup is decided, e.g.
      // `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`
      const url = isEditing ? `/api/admin/blogs/${postId}` : "/api/admin/blogs";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, { method, body: payload });
      if (!res.ok) throw new Error("Saving isn't connected to a backend yet.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Title */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="title" className="text-sm font-medium text-mw-ink/80">
            Blog Title
          </label>
          <button
            type="button"
            onClick={() => setTitle("")}
            disabled={!title}
            className="text-xs font-semibold text-mw-ink/40 transition hover:text-mw-secondary disabled:opacity-40 disabled:hover:text-mw-ink/40"
          >
            Clear
          </button>
        </div>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. 5 Signs It's Time to Modernize Your Stack"
          className="w-full rounded-lg border border-mw-line px-4 py-2.5 text-sm outline-none focus:border-mw-secondary"
        />
      </div>

      {/* Cover image */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-sm font-medium text-mw-ink/80">Cover Image</span>
          <button
            type="button"
            onClick={clearImage}
            disabled={!image && !existingImageUrl}
            className="text-xs font-semibold text-mw-ink/40 transition hover:text-mw-secondary disabled:opacity-40 disabled:hover:text-mw-ink/40"
          >
            Clear
          </button>
        </div>

        {imagePreview ? (
          <label htmlFor="image" className="block cursor-pointer overflow-hidden rounded-xl border border-mw-line">
            {/* eslint-disable-next-line @next/next/no-img-element -- may be a local blob preview of an unsaved upload */}
            <img src={imagePreview} alt="Cover preview" className="h-56 w-full object-cover" />
          </label>
        ) : (
          <label
            htmlFor="image"
            className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-mw-line text-center text-sm text-mw-ink/50 transition hover:border-mw-secondary hover:text-mw-secondary"
          >
            <span className="font-medium">Click to upload</span>
            <span className="mt-1 text-xs">PNG or JPG, up to a few MB</span>
          </label>
        )}

        <input
          ref={fileInputRef}
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="sr-only"
        />
      </div>

      {/* Content */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="content" className="text-sm font-medium text-mw-ink/80">
            Content
          </label>
          <button
            type="button"
            onClick={() => setContent("")}
            disabled={!content}
            className="text-xs font-semibold text-mw-ink/40 transition hover:text-mw-secondary disabled:opacity-40 disabled:hover:text-mw-ink/40"
          >
            Clear
          </button>
        </div>
        <textarea
          id="content"
          name="content"
          required
          rows={14}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write the blog post here..."
          className="w-full rounded-lg border border-mw-line px-4 py-2.5 text-sm outline-none focus:border-mw-secondary"
        />
      </div>

      {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}
      {status === "success" && (
        <p className="text-sm text-mw-secondary">
          Form data is ready to send — connect the Save button to your backend to actually {isEditing ? "update" : "publish"} it.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "saving"}
        className="w-full rounded-full bg-mw-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-mw-secondary disabled:opacity-60 sm:w-auto"
      >
        {status === "saving" ? "Saving…" : isEditing ? "Save Changes" : "Save Blog Post"}
      </button>
    </form>
  );
}
