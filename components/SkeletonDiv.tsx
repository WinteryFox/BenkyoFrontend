export default function SkeletonDiv(props: {
    className?: string
}) {
    return (
        <div className={`loading ${props.className}`} aria-hidden aria-busy/>
    )
}