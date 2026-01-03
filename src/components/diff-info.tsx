import {ReactNode, useEffect, useRef, useState} from "react";
import {Badge} from "react-bootstrap";

export default function DiffInfo({beforeValue, currentValue, text}: { beforeValue: number, currentValue: number, text: string }) {
  const newText = useRef<string>(
    `${text}`
      .replace(/{bv}/, (beforeValue === 0 ? "nenhum" : beforeValue).toLocaleString("pt-BR"))
      .replace(/{cv}/, (currentValue === 0 ? "nenhum" : currentValue).toLocaleString("pt-BR"))
  );
  
  const positiveDiff = useRef<ReactNode>(
    <Badge bg={"success"} pill={true} className={"border-0 p-1"}>
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
      </svg>
    </Badge>
  );
  
  const negativeDiff = useRef<ReactNode>(
    <Badge bg={"info"} pill={true} className={"border-0 p-1"}>
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
      </svg>
    </Badge>
  );
  
  const [content, setContent] = useState<ReactNode>(<></>);
  
  useEffect(() => {
    if (newText.current) {
      const diff = currentValue - beforeValue;
      
      setContent(
        <div className={"text-small d-inline-flex align-items-center gap-1 flex-wrap font-inter fw-normal"}>
          {diff > 0 ? positiveDiff.current : negativeDiff.current}
          <span className={"text-body-tertiary"}> {newText.current}</span>
        </div>
      )
    }
  }, [beforeValue, currentValue, newText]);
  
  return <>{content}</>;
}