import SkeletonDiv from "../SkeletonDiv";

export default function SkeletonDeckPreview() {
    return <div className={"flex grow-0 select-none mt-4 md:mr-4 w-72 h-[332px] flex-col p-4 rounded-3xl border border-gray-200 dark:border-gray-600"}>
        <div className={"flex justify-center"}>
            <SkeletonDiv className={"flex rounded-3xl w-40 h-40"}/>
        </div>
        <SkeletonDiv className={"mt-2 w-full h-10 rounded"}/>
        <SkeletonDiv className={"mt-1 w-1/2 h-3 rounded"}/>
        <SkeletonDiv className={"mt-1 w-full h-5 rounded"}/>
        <SkeletonDiv className={"mt-1 w-full h-5 rounded"}/>
        <SkeletonDiv className={"mt-1 w-2/3 h-5 rounded"}/>
    </div>
}
