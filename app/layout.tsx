import "./globals.scss";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

export const metadata = {
    title: "Sisgo ",
    description: "Discuções aprofundadas sobre tecnologia",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
            <body className={poppins.className}>{children}</body>
        </html>
    );
}
