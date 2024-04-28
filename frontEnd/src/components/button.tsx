import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

const Button = ({ children, disabled, onClick, className }: { disabled?: boolean } & PropsWithChildren & ButtonHTMLAttributes<any>) => {
    return (
        <button disabled={disabled} onClick={onClick} className={`p-2 bg-slate-400 hover:bg-slate-300 transition disabled:cursor-not-allowed min-w-16 ${className}`}>{children}</button>
    )
}

export default Button;