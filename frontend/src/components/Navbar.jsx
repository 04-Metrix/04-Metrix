export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h1 className="text-xl font-semibold">Lecture AI</h1>

      <div className="flex gap-4 text-sm text-gray-600">
        <button>Library</button>
        <button>Settings</button>
      </div>
    </div>
  )
}