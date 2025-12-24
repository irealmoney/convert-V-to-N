export default function Footer() {
    return (
        <footer className="w-full py-4 border-t mt-8 text-center">
            <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} NIP Petshop. All rights reserved.
            </p>
        </footer>
    );
}