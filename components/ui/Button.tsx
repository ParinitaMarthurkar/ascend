import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    fullWidth?: boolean;
}

export default function Button({
    children,
    fullWidth = false,
    className = "",
    ...props
}: ButtonProps) {
    return (
        <button
            className={`
        h-14 rounded-2xl
        bg-[var(--primary)]
        px-6
        text-base
        font-semibold
        text-white
        transition-all
        duration-300
        hover:bg-[var(--primary-dark)]
        active:scale-[0.98]
        disabled:opacity-50
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    );
}