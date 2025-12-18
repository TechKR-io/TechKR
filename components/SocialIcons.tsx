export default function SocialIcons() {
    return (
      <div className="flex justify-center gap-6 mt-6">
        <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
          <img src="/google.png" alt="Google" className="w-6 h-6" />
        </button>
        <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
          <img src="/apple.png" alt="Apple" className="w-6 h-6" />
        </button>
        <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
          <img src="/facebook.png" alt="Facebook" className="w-6 h-6" />
        </button>
        <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
          <img src="/x.png" alt="X" className="w-6 h-6" />
        </button>
      </div>
    );
}