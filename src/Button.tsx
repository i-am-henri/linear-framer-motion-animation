import { ReactNode } from "react";

export function Button(props: { className?: string; children: ReactNode }) {
  return (
    <button
      className={`p-2 border-2 border-[#161616] rounded-full hover:bg-[#161616] flex items-center justify-center text-[#9C9BA1] hover:text-white ${
        props.className || ""
      }`.trim()}
    >
      {props.children}
    </button>
  );
}
