import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login | EventLoop",
  description:
    "Sign in to EventLoop to discover, book, and manage exciting events near you. Join the loop of unforgettable experiences.",
  keywords: [
    "EventLoop",
    "event booking",
    "login",
    "concerts",
    "shows",
    "ticket booking",
    "event management",
  ],
  openGraph: {
    title: "Login | EventLoop",
    description:
      "Access your EventLoop account to explore trending events, book tickets, and manage your bookings effortlessly.",
    url: "https://eventloop-frontend.vercel.app/login", // ← replace with your actual Vercel link
    siteName: "EventLoop",
    images: [
      {
        url: "https://eventloop-frontend.vercel.app/og-image.jpg", // you can change this to your actual OG image
        width: 1200,
        height: 630,
        alt: "EventLoop Login Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Login | EventLoop",
    description:
      "Log in to EventLoop and be part of the loop — your gateway to amazing live experiences.",
    images: ["https://eventloop-frontend.vercel.app/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
       <div className="flex justify-between h-full">
         <div className="lg:px-10 lg:py-10 w-full lg:w-1/2">
            {children}
         </div>
         <div className="hidden lg:block w-[40%] h-full fixed top-0 right-0
         ">
            <Image src={"/login.jpg"} alt=""   fill
  style={{ objectFit: "cover", objectPosition: "right" }}/>
         </div>
       </div>
  );
}
