interface BorderWrapperProps {
    children: React.ReactNode;
    className?: string;
}

export default function BorderWrapper({ children, className }: BorderWrapperProps) {
    return (
        <div className={`border-2 border-muted rounded-md p-5 ${className}`}>
            {children}
        </div>
    );
}
