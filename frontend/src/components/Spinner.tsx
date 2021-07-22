interface ISpinner {
    color: string,
    height: string,
    width: string
}

export default function Spinner({color, height, width}: ISpinner) {
    return (
        <>
            <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
                <div className={"animate-spin rounded-full h-" + height + " w-" + width + " border-t-4 border-r-8 border-l-2 border-" + color + "-900"}></div>
            </div>
        </>
    );
}

//Default styles
Spinner.defaultProps = {
    color: "purple",
    height: "48",
    width: "48"
}
