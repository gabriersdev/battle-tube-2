import Link from "next/link";
import {Button, Spinner} from "react-bootstrap";
import React, {useState} from "react";

interface LinkButton {
  href: string;
  className?: string;
  btnClassName?: string;
  btnVariant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
  btnSize?: "sm" | "lg" | undefined;
  rel?: string;
  target?: string;
  draggable?: boolean;
  children: React.ReactNode;
}

export default function LinkButton({
                                     href,
                                     className,
                                     btnClassName,
                                     btnVariant = "primary",
                                     btnSize,
                                     rel,
                                     target,
                                     draggable = false,
                                     children
                                   }: LinkButton) {
  
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <Link
      href={`${isLoading ? "" : href}`}
      className={className}
      rel={rel}
      onClick={() => setIsLoading(true)}
      target={target}
      draggable={draggable}
    >
      <Button
        className={`${btnClassName} ${isLoading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
        variant={btnVariant}
        size={btnSize}
      >
        {isLoading ? (
          <div className={"d-flex align-items-center gap-1 fs-base"}>
            <span>Carregando...</span>
            <Spinner animation="grow" size={"sm"} variant={"dark"}/>
          </div>
        ) : <>{children}</>}
      </Button>
    </Link>
  )
}