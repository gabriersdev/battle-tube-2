import {Ref} from "react";

const IframeClip = (
  {
    ref,
    className,
    id,
    allowFullScreen
  }: {
    ref?: Ref<HTMLIFrameElement>,
    className?: string,
    id?: number,
    allowFullScreen?: boolean
  }) => {
  return (
    <iframe
      ref={ref}
      className={className}
      src={`https://clips.twitch.tv/embed?clip=${id}&parent=${window.location.hostname || 'localhost'}`}
      allowFullScreen={allowFullScreen}>
    </iframe>
  )
}

export default IframeClip;