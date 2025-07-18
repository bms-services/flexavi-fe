import { ReactNode } from "react";
import { ToastShowProps } from "./toast-helper";

export default function ToastContent(props: ToastShowProps, icon: ReactNode) {
  return (
    <div className="overflow-hidden w-full h-full">
      <div className="absolute bottom-0 right-0 text-[#3e4152]">
        {/* <svg width="84" height="75" viewBox="0 0 84 75" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20.6075" cy="9.29547" r="9.29547" fill="currentColor" />
          <circle cx="80.0986" cy="47.7167" r="3.71819" fill="currentColor" />
          <path d="M79.4438 11.0253C82.4971 18.5483 78.8737 27.1221 71.3507 30.1754C70.5208 30.5122 69.6781 30.7678 68.8315 30.9458C64.1204 31.9366 58.8591 33.2841 56.3382 37.3855C53.3951 42.1741 55.0036 48.3927 59.3496 51.9571C68.015 59.0642 75.0268 68.4315 79.3829 79.6187C92.9059 114.348 75.7149 153.464 40.9856 166.987C6.25636 180.51 -32.8599 163.319 -46.3829 128.59C-59.9059 93.8607 -42.7149 54.7445 -7.98562 41.2214C7.18342 35.3148 23.1894 35.2678 37.5341 39.9824C42.7299 41.69 48.6536 40.072 51.5174 35.4125L52.5823 33.68C54.694 30.2441 53.7172 25.8191 52.2006 22.0823C49.1473 14.5592 52.7707 5.98544 60.2937 2.93215C67.8167 -0.121136 76.3906 3.5023 79.4438 11.0253Z" fill="currentColor" />
        </svg> */}
      </div>
      <div className="relative flex justify-between items-center w-full h-full py-[6px] px-[8px] z-10">
        <div className="flex items-center gap-1">
          {(props.iconSuffix ?? icon) && (
            <div className="flex items-center justify-center w-[20px] h-[20px] text-[#3e4152]">
              {props.iconSuffix ?? icon}
            </div>
          )}

          <div className="flex flex-col gap-0">
            {props.title && (
              <h3 className="text-[14px] font-medium">{props.title}</h3>
            )}
            {props.description && (
              <p className="text-[12px]">{props.description}</p>
            )}
          </div>

          {/* Button */}
          {props.onConfirm && (
            <button
              onClick={props.onConfirm}
              className="ml-2 px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
