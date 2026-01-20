import Link from "next/link";
import { Music, Trophy, Theater, Palette, Users } from "lucide-react";

const categories = [
    { name: "Concerts", icon: Music, href: "#" },
    { name: "Sports", icon: Trophy, href: "#" },
    { name: "Arts & Theater", icon: Theater, href: "#" },
    { name: "Family", icon: Users, href: "#" },
    { name: "Festivals", icon: Palette, href: "#" },
];

export default function CategoryNav() {
    return (
        <div className="border-b border-gray-200 bg-white py-4 shadow-sm">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
                <ul className="flex items-center justify-center gap-8 md:justify-start">
                    {categories.map((category) => (
                        <li key={category.name}>
                            <Link
                                href={category.href}
                                className="group flex flex-col items-center gap-2 text-sm text-gray-600 hover:text-[#026cdf]"
                            >
                                <category.icon className="h-6 w-6 transition-transform group-hover:scale-110" />
                                <span className="text-xs font-medium md:text-sm">{category.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
