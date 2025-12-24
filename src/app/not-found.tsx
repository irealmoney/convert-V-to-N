


export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Sorry, the page you are looking for does not exist.</p>
            <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Go back to Home
            </a>
        </div>
    );
}