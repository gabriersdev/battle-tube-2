import {Ref, useEffect, useState} from "react";

const Iframe = (
  {
    ref,
    className,
    style,
    id,
    allowFullScreen,
    width,
    height,
    ignoreResponsiveWidth = false
  }: {
    ref?: Ref<HTMLIFrameElement>,
    className?: string,
    style?: object,
    id: number | string,
    allowFullScreen?: boolean,
    width?: number | string,
    height?: number | string,
    ignoreResponsiveWidth?: boolean
  }) => {
  const [iframeStyle, setIframeStyle] = useState(style);

  useEffect(() => {
    if (ignoreResponsiveWidth) return;

    const handleResize = () => {
      setIframeStyle(style);
      // if (window.innerWidth > 1400) {
      //   setIframeStyle({...style, width: "100%", maxWidth: "1200px"});
      // } else {
      //   setIframeStyle(style);
      // }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once on mount

    return () => window.removeEventListener("resize", handleResize);
  }, [style, ignoreResponsiveWidth]);

  return (
    <iframe
      ref={ref}
      className={className}
      src={`https://clips.twitch.tv/embed?clip=${id}&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}`}
      width={width}
      height={height}
      style={iframeStyle}
      allowFullScreen={allowFullScreen}>
    </iframe>
  )
}

export default Iframe;
