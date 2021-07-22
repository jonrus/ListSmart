import {IItem} from "./Item";

export interface IItemModal {
    item: IItem,
    fnClose(): void,
}

export default function ItemModal({item, fnClose}: IItemModal) {
    return(
        <>
            <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-90 z-50">
                <div className="bg-white rounded-lg">
                    <div className="flex flex-col items-start p-4">
                        <div className="flex items-center w-full">
                            <div className="text-gray-900 font-medium text-xl">{item.title}</div>
                            <svg className="border border-gray-900 rounded ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" onClick={fnClose}>
                                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
                            </svg>
                        </div>
                    <div className="text-gray-900 text-lg my-4">{item.notes}</div>
                    <div className="ml-auto mt-4">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2">
                        Mark
                        </button>
                        <button className="bg-transparent hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-2 mb-2" onClick={fnClose}>
                        Cancel
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Delete
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}
