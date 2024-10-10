"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
const Excalidraw = dynamic(
    async () => (await import("@excalidraw/excalidraw")).Excalidraw,
    {
        ssr: false,
    },
);
import { exportToCanvas } from "@excalidraw/excalidraw";
import { Button } from "@/components/ui/button";
import { type ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";

export default function ScribblePage() {
    const [canvasUrl, setCanvasUrl] = useState("");
    const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null);

    const [counter, setCounter] = useState(false);

    return (
        <>
            <div className="h-[90vh] grid place-items-center">
                <div>
                    <h1 className="text-center text-5xl font-extrabold">Scratch Pad</h1>
                    <div className="h-[80vh] w-[90vw]">
                        <Excalidraw
                            theme="dark"
                            excalidrawAPI={(api) => setExcalidrawAPI(api)}
                        />
                    </div>
                </div>
            </div>
            <div className="grid place-items-center">
                <Button className=""
                    onClick={async () => {
                        if (!excalidrawAPI) {
                            return
                        }
                        const elements = excalidrawAPI.getSceneElements();
                        if (!elements || !elements.length) {
                            return
                        }
                        const canvas = await exportToCanvas({
                            elements,
                            appState: {
                                exportWithDarkMode: false,
                            },
                            files: excalidrawAPI.getFiles(),
                            // getDimensions: () => { return { width: 350, height: 350 } }
                        });
                        setCanvasUrl(canvas.toDataURL());

                        setCounter(false)
                    }}
                >Generate Prescription</Button>
                <div className="export export-canvas grid justify-items-center" style={{ display: useState(counter) ? "block" : "none" }}>
                    <img src={canvasUrl} alt="" className="w-[80vw] m-10" />

                    <div className="grid justify-items-center mb-10">
                        <Button>Proceed &gt;</Button>
                    </div>
                </div>
            </div>
        </>
    );
}