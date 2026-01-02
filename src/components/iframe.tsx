import {Ref} from "react";

const Iframe = (
  {
    ref,
    className,
    style,
    id,
    allowFullScreen,
    width,
    height,
  }: {
    ref?: Ref<HTMLIFrameElement>,
    className?: string,
    style?: object,
    id: number | string,
    allowFullScreen?: boolean,
    width?: number | string,
    height?: number | string
  }) => {
  return (
    <iframe
      ref={ref}
      className={className}
      src={`https://clips.twitch.tv/embed?clip=${id}&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}`}
      width={width}
      height={height}
      style={style}
      allowFullScreen={allowFullScreen}>
    </iframe>
  )
}

export default Iframe;
