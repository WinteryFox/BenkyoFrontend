import {useState} from 'react';
import Image, {ImageProps} from "next/image";

export default function ImageWithFallback(props: ImageProps & {placeholder: 'blur'}) {
    const [imgSrc, setImgSrc] = useState(props.src);

    return <Image {...props} alt={props.alt} src={imgSrc} onError={() => setImgSrc(props.placeholder)}/>
};
