"use client"

const shapes = [
  { type: "circle", color: "#5BA4D9", size: 48, top: "8%", left: "5%", delay: "0s" },
  { type: "star", color: "#E8B630", size: 32, top: "12%", right: "8%", delay: "1s" },
  { type: "triangle", color: "#E8724A", size: 28, top: "65%", left: "3%", delay: "2s" },
  { type: "circle", color: "#49B889", size: 20, top: "40%", right: "4%", delay: "0.5s" },
  { type: "square", color: "#9B6DD7", size: 22, top: "80%", right: "7%", delay: "1.5s" },
  { type: "star", color: "#E05A8D", size: 24, top: "55%", left: "7%", delay: "3s" },
]

function ShapeSvg({ type, color, size }: { type: string; color: string; size: number }) {
  switch (type) {
    case "circle":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" fill={color} opacity="0.25" />
          <circle cx="20" cy="20" r="12" fill={color} opacity="0.15" />
        </svg>
      )
    case "star":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <path d="M20 2L24.5 14.5L38 16L28 25.5L30 38L20 32L10 38L12 25.5L2 16L15.5 14.5L20 2Z" fill={color} opacity="0.25" />
        </svg>
      )
    case "triangle":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <path d="M20 4L36 36H4L20 4Z" fill={color} opacity="0.2" />
        </svg>
      )
    case "square":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <rect x="6" y="6" width="28" height="28" rx="6" fill={color} opacity="0.2" transform="rotate(15 20 20)" />
        </svg>
      )
    default:
      return null
  }
}

export function FloatingShapes() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden hidden lg:block" aria-hidden="true">
      {shapes.map((shape, i) => (
        <div
          key={i}
          className={i % 2 === 0 ? "animate-float" : "animate-float-delay"}
          style={{
            position: "absolute",
            top: shape.top,
            left: "left" in shape ? shape.left : undefined,
            right: "right" in shape ? shape.right : undefined,
            animationDelay: shape.delay,
          }}
        >
          <ShapeSvg type={shape.type} color={shape.color} size={shape.size} />
        </div>
      ))}
    </div>
  )
}
