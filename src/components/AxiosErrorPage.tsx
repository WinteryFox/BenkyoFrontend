import {AxiosError} from "axios";

export default function AxiosErrorPage(props: {
    error: AxiosError
}) {
    return <div className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"}>
        <div className={"flex justify-center"}>
            <div className={"text-3xl mr-2"}>
                {props.error.response != null ?
                    props.error.response.status :
                    props.error.name}
            </div>
            <div className={"border border-black dark:border-white"} aria-hidden/>
            <div className={"flex ml-2 self-center text-lg"}>
                {props.error.response != null ?
                    props.error.response.statusText :
                    props.error.message}
            </div>
        </div>
    </div>
}
