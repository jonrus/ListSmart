
interface IAddBtn {
    fnOnClick(): void
}

export default function AddBtn({fnOnClick}: IAddBtn) {
    return (
        <div className="fixed
                bottom-0 right-0 rounded-full
                w-10 h-10 bg-green-500 p-6 m-4
                flex items-center justify-center
                text-4xl font-extrabold text-white"
            onClick={fnOnClick}
            >
            +
        </div>
    );
}
