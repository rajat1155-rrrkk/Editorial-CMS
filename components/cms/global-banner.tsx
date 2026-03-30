type GlobalBannerProps = {
  message: string;
};

export function GlobalBanner({ message }: GlobalBannerProps) {
  return (
    <div className="tenant-banner mb-5">
      <p className="tenant-banner__eyebrow">Global alert</p>
      <p className="tenant-banner__message">{message}</p>
    </div>
  );
}
