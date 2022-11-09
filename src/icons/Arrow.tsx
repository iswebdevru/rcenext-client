export interface ArrowProps {
  className: string;
  width?: number;
  height?: number;
}

export default function Arrow({
  className,
  width = 12,
  height = 7,
}: ArrowProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 7"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="none" strokeWidth="1">
        <g transform="translate(-616.000000, -2467.000000)">
          <g transform="translate(100.000000, 2404.000000)">
            <g transform="translate(510.000000, 54.000000)">
              <g>
                <path
                  d="M8.12,9.29 L12,13.17 L15.88,9.29 C16.27,8.9 16.9,8.9 17.29,9.29 C17.68,9.68 17.68,10.31 17.29,10.7 L12.7,15.29 C12.31,15.68 11.68,15.68 11.29,15.29 L6.7,10.7 C6.31,10.31 6.31,9.68 6.7,9.29 C7.09,8.91 7.73,8.9 8.12,9.29 Z"
                  className={className}
                ></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
