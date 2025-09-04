export default function Placeholder({text=""}: {text?: string}) {
  return <div className="w-full h-full border bg-muted font-mono flex items-center justify-center">{text}</div>
}