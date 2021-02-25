import React from 'react';

export const Add_12 = ({ fill, boxShadow, borderRadius }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12pt"
    height="12pt"
    viewBox="0 0 12 12"
    fill={fill}
    style={{ boxShadow, borderRadius }}
  >
    <path d="M 6 0 C 2.6875 0 0 2.6875 0 6 C 0 9.3125 2.6875 12 6 12 C 9.3125 12 12 9.3125 12 6 C 12 2.6875 9.3125 0 6 0 Z M 9.5 7 L 7 7 L 7 9.5 L 5 9.5 L 5 7 L 2.5 7 L 2.5 5 L 5 5 L 5 2.5 L 7 2.5 L 7 5 L 9.5 5 Z M 9.5 7 " />
  </svg>
);

export const Add = ({ onClick, fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7 14h-5v5h-4v-5h-5v-4h5v-5h4v5h5v4z" />
  </svg>
);

export const Setting = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M24 14.187v-4.374c-2.148-.766-2.726-.802-3.027-1.529-.303-.729.083-1.169 1.059-3.223l-3.093-3.093c-2.026.963-2.488 1.364-3.224 1.059-.727-.302-.768-.889-1.527-3.027h-4.375c-.764 2.144-.8 2.725-1.529 3.027-.752.313-1.203-.1-3.223-1.059l-3.093 3.093c.977 2.055 1.362 2.493 1.059 3.224-.302.727-.881.764-3.027 1.528v4.375c2.139.76 2.725.8 3.027 1.528.304.734-.081 1.167-1.059 3.223l3.093 3.093c1.999-.95 2.47-1.373 3.223-1.059.728.302.764.88 1.529 3.027h4.374c.758-2.131.799-2.723 1.537-3.031.745-.308 1.186.099 3.215 1.062l3.093-3.093c-.975-2.05-1.362-2.492-1.059-3.223.3-.726.88-.763 3.027-1.528zm-4.875.764c-.577 1.394-.068 2.458.488 3.578l-1.084 1.084c-1.093-.543-2.161-1.076-3.573-.49-1.396.581-1.79 1.693-2.188 2.877h-1.534c-.398-1.185-.791-2.297-2.183-2.875-1.419-.588-2.507-.045-3.579.488l-1.083-1.084c.557-1.118 1.066-2.18.487-3.58-.579-1.391-1.691-1.784-2.876-2.182v-1.533c1.185-.398 2.297-.791 2.875-2.184.578-1.394.068-2.459-.488-3.579l1.084-1.084c1.082.538 2.162 1.077 3.58.488 1.392-.577 1.785-1.69 2.183-2.875h1.534c.398 1.185.792 2.297 2.184 2.875 1.419.588 2.506.045 3.579-.488l1.084 1.084c-.556 1.121-1.065 2.187-.488 3.58.577 1.391 1.689 1.784 2.875 2.183v1.534c-1.188.398-2.302.791-2.877 2.183zm-7.125-5.951c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.762 0-5 2.238-5 5s2.238 5 5 5 5-2.238 5-5-2.238-5-5-5z" />
  </svg>
);

export const Compass = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 5.999l-5.621 2.986c-.899-.104-1.806.191-2.474.859-.662.663-.95 1.561-.862 2.428l-3.043 5.728 5.724-3.042c.884.089 1.772-.205 2.432-.865.634-.634.969-1.524.859-2.473l2.985-5.621zm-5.97 7.22c-.689 0-1.25-.559-1.25-1.249-.001-.691.559-1.251 1.25-1.25.69 0 1.25.56 1.25 1.25-.001.689-.56 1.249-1.25 1.249z" />
  </svg>
);

export const Delete = ({ onClick, fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill={fill}
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <path d="M 10 1.667969 C 14.59375 1.667969 18.332031 5.40625 18.332031 10 C 18.332031 14.59375 14.59375 18.332031 10 18.332031 C 5.40625 18.332031 1.667969 14.59375 1.667969 10 C 1.667969 5.40625 5.40625 1.667969 10 1.667969 Z M 10 0 C 4.476562 0 0 4.476562 0 10 C 0 15.523438 4.476562 20 10 20 C 15.523438 20 20 15.523438 20 10 C 20 4.476562 15.523438 0 10 0 Z M 15 13.78125 L 11.171875 9.992188 L 14.960938 6.167969 L 13.78125 5 L 9.996094 8.824219 L 6.171875 5.039062 L 5 6.210938 L 8.828125 10.003906 L 5.039062 13.828125 L 6.210938 15 L 10.003906 11.171875 L 13.832031 14.960938 Z M 15 13.78125 " />
  </svg>
);

export const Star = ({ onClick, fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" />
  </svg>
);

export const Flag = ({ onClick, fill, margin = '0' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill={fill}
    onClick={onClick}
    style={{ cursor: 'pointer', margin }}
  >
    <path d="M 14.371094 3.367188 C 11.570312 3.367188 11.507812 0.957031 8.257812 0.957031 C 6.5 0.957031 4.863281 1.773438 4.167969 2.367188 L 4.167969 0 L 2.5 0 L 2.5 20 L 4.167969 20 L 4.167969 12.4375 C 5.152344 11.757812 6.648438 11.039062 8.269531 11.039062 C 11.339844 11.039062 11.769531 13.332031 14.503906 13.332031 C 16.273438 13.332031 17.5 12.199219 17.5 12.199219 L 17.5 2.175781 C 17.5 2.175781 16.148438 3.367188 14.371094 3.367188 Z M 15.832031 7.722656 C 13.820312 9.203125 11.640625 7.4375 10.542969 6.710938 L 10.542969 9.769531 C 9.914062 9.535156 9.171875 9.371094 8.269531 9.371094 C 6.621094 9.371094 5.175781 9.9375 4.167969 10.488281 L 4.167969 7.328125 C 6.050781 5.6875 8.789062 5.46875 10.542969 6.710938 L 10.542969 3.542969 C 11.347656 4.171875 12.449219 5.035156 14.371094 5.035156 C 14.894531 5.035156 15.382812 4.964844 15.832031 4.847656 Z M 15.832031 7.722656 " />
  </svg>
);

export const Play = ({ onClick, margin = '0' }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    style={{ cursor: 'pointer', margin }}
  >
    <path
      d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z"
      fill="#0F4C82"
    />
    <rect width="12" height="24" fill="#0F4C82" />
    <path d="M17 12L8 17V7L17 12Z" fill="white" />
    <path d="M17 12L8 17V7L17 12Z" fill="white" />
  </svg>
);

export const Play_black = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z"
      fill="black"
    />
    <rect width="12" height="24" fill="black" />
    <path d="M17 12L8 17V7L17 12Z" fill="#0F4C82" />
    <path d="M17 12L8 17V7L17 12Z" fill="#0F4C82" />
  </svg>
);

export const HeartEmpty = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z" />
  </svg>
);

export const HeartFull = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#ED4956"
  >
    <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
  </svg>
);

export const User = () => (
  <img
    src="https://slog-iam.s3.ap-northeast-2.amazonaws.com/icon/user.png"
    alt="School"
    width="24"
    height="24"
  />
);

export const Study_true = () => (
  <img src="/icon/study_true.png" alt="shutter" width="40" height="40" />
);

export const Study_false = () => (
  <img src="/icon/study_false.png" alt="shutter" width="40" height="40" />
);

export const Comment = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M12 3c5.514 0 10 3.476 10 7.747 0 4.272-4.48 7.748-9.986 7.748-.62 0-1.092-.046-1.759-.097-1 .776-1.774 1.403-3.485 1.962.26-1.383-.113-2.259-.514-3.259-2.383-1.505-4.256-3.411-4.256-6.354 0-4.271 4.486-7.747 10-7.747zm0-2c-6.627 0-12 4.363-12 9.747 0 3.13 1.816 5.916 4.641 7.699.867 2.167-1.084 4.008-3.143 4.502 3.085.266 6.776-.481 9.374-2.497 7.08.54 13.128-3.988 13.128-9.704 0-5.384-5.373-9.747-12-9.747z" />
  </svg>
);

export const CommentFull = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M12 1c-6.627 0-12 4.364-12 9.749 0 3.131 1.817 5.917 4.64 7.7.868 2.167-1.083 4.008-3.142 4.503 2.271.195 6.311-.121 9.374-2.498 7.095.538 13.128-3.997 13.128-9.705 0-5.385-5.373-9.749-12-9.749z" />
  </svg>
);

// export const Logo = ({ size = 24 }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
//     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
//   </svg>
// )

// export const Logo = () => (
//   <img
//     src="https://slog-iam.s3.ap-northeast-2.amazonaws.com/icon/DEEPTIME_Logo2.png"
//     alt="mainLogo"
//     height="35"
//   />
// );

export const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="153"
    height="25"
    viewBox="0 0 153 25"
    fill="#0F4C82"
  >
    <path d="M 0 14.4375 L 0 24.996094 L 5.351562 24.996094 C 8.753906 24.996094 10.796875 24.992188 10.957031 24.988281 C 12.261719 24.933594 13.488281 24.65625 14.667969 24.15625 C 14.917969 24.050781 15.445312 23.789062 15.671875 23.660156 C 16.328125 23.292969 16.910156 22.878906 17.507812 22.359375 C 17.703125 22.1875 18.277344 21.613281 18.449219 21.417969 C 19.761719 19.90625 20.601562 18.144531 20.925781 16.230469 C 21.269531 14.222656 21.03125 12.164062 20.238281 10.300781 C 20.132812 10.050781 19.875 9.523438 19.746094 9.292969 C 19.378906 8.636719 18.964844 8.054688 18.449219 7.457031 C 18.277344 7.257812 17.703125 6.683594 17.507812 6.511719 C 16.097656 5.285156 14.507812 4.484375 12.71875 4.105469 C 12.269531 4.007812 11.84375 3.949219 11.199219 3.894531 C 11.089844 3.886719 9.601562 3.882812 5.527344 3.878906 L 0 3.875 Z M 13.148438 15.554688 C 14.578125 17.804688 15.746094 19.648438 15.742188 19.652344 C 15.742188 19.652344 8.878906 15.285156 7.609375 14.472656 L 7.554688 14.433594 L 9.042969 12.941406 C 9.863281 12.121094 10.539062 11.453125 10.542969 11.457031 C 10.546875 11.460938 11.71875 13.304688 13.148438 15.554688 Z M 13.148438 15.554688 " />
    <path d="M 24.472656 14.4375 L 24.472656 24.988281 L 40.359375 24.988281 L 40.359375 20.898438 L 29.175781 20.898438 L 29.175781 16.371094 L 39.21875 16.371094 L 39.21875 12.28125 L 29.175781 12.28125 L 29.175781 7.984375 L 40.125 7.984375 L 40.125 3.886719 L 24.472656 3.886719 Z M 24.472656 14.4375 " />
    <path d="M 43.53125 14.4375 L 43.53125 24.988281 L 59.414062 24.988281 L 59.414062 20.898438 L 48.222656 20.898438 L 48.222656 18.636719 L 48.226562 16.375 L 53.25 16.371094 L 58.277344 16.371094 L 58.277344 12.28125 L 53.25 12.28125 L 48.226562 12.277344 L 48.222656 10.128906 L 48.222656 7.984375 L 59.183594 7.984375 L 59.183594 3.886719 L 43.53125 3.886719 Z M 43.53125 14.4375 " />
    <path d="M 62.582031 3.894531 C 62.578125 3.898438 62.578125 8.644531 62.578125 14.445312 L 62.578125 24.988281 L 67.277344 24.988281 L 67.28125 22.179688 L 67.28125 19.375 L 69.355469 19.367188 C 70.492188 19.363281 71.445312 19.355469 71.46875 19.355469 C 71.492188 19.351562 71.585938 19.34375 71.683594 19.335938 C 72.875 19.257812 74.050781 18.984375 75.003906 18.5625 C 76.664062 17.832031 77.871094 16.703125 78.582031 15.222656 C 78.992188 14.375 79.226562 13.472656 79.320312 12.410156 C 79.34375 12.144531 79.351562 11.359375 79.335938 11.070312 C 79.210938 8.878906 78.375 7.105469 76.863281 5.839844 C 76.066406 5.167969 75 4.621094 73.890625 4.300781 C 73.128906 4.085938 72.390625 3.96875 71.378906 3.90625 C 71.160156 3.890625 62.597656 3.878906 62.582031 3.894531 Z M 71.125 8.082031 C 71.863281 8.15625 72.421875 8.304688 72.910156 8.554688 C 73.179688 8.691406 73.363281 8.8125 73.597656 9.015625 C 74.339844 9.648438 74.699219 10.617188 74.644531 11.820312 C 74.617188 12.40625 74.507812 12.871094 74.292969 13.3125 C 74.144531 13.617188 73.96875 13.859375 73.734375 14.09375 C 73.164062 14.660156 72.402344 15.011719 71.433594 15.144531 C 71.015625 15.203125 71.070312 15.199219 69.105469 15.203125 L 67.277344 15.207031 L 67.277344 8.058594 L 69.113281 8.0625 C 70.730469 8.0625 70.972656 8.066406 71.125 8.082031 Z M 71.125 8.082031 " />
    <path d="M 80.703125 3.894531 C 80.699219 3.898438 80.695312 4.835938 80.695312 5.980469 L 80.695312 8.058594 L 87.546875 8.058594 L 87.546875 24.988281 L 92.246094 24.988281 L 92.246094 8.058594 L 99.097656 8.058594 L 99.097656 3.886719 L 89.902344 3.886719 C 84.847656 3.886719 80.707031 3.890625 80.703125 3.894531 Z M 80.703125 3.894531 " />
    <path d="M 101.628906 14.4375 L 101.628906 24.988281 L 106.328125 24.988281 L 106.328125 3.886719 L 101.628906 3.886719 Z M 101.628906 14.4375 " />
    <path d="M 110.058594 14.4375 L 110.058594 24.988281 L 114.75 24.988281 L 114.75 19.203125 C 114.75 15.347656 114.753906 13.421875 114.761719 13.429688 C 114.765625 13.433594 115.867188 15.257812 117.203125 17.476562 L 119.640625 21.519531 L 121.0625 21.519531 L 122.484375 21.523438 L 127.359375 13.429688 L 127.363281 19.207031 L 127.367188 24.988281 L 132.066406 24.988281 L 132.066406 3.886719 L 128.328125 3.886719 L 124.699219 9.789062 C 122.703125 13.035156 121.066406 15.695312 121.0625 15.695312 C 121.058594 15.695312 119.425781 13.035156 117.429688 9.789062 L 113.796875 3.886719 L 110.058594 3.886719 Z M 110.058594 14.4375 " />
    <path d="M 135.796875 14.4375 L 135.796875 24.988281 L 151.691406 24.988281 L 151.691406 22.945312 L 151.6875 20.90625 L 140.5 20.898438 L 140.5 16.371094 L 150.554688 16.371094 L 150.554688 12.28125 L 140.5 12.28125 L 140.5 7.984375 L 145.976562 7.980469 L 151.457031 7.980469 L 151.457031 3.890625 L 143.628906 3.886719 L 135.796875 3.886719 Z M 135.796875 14.4375 " />
  </svg>
);

export const Logo_loader = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="#0F4C82"
  >
    <path d="M 0 12.5 L 0 25 L 6.347656 25 C 10.382812 25 12.800781 24.996094 12.992188 24.988281 C 14.539062 24.921875 15.996094 24.597656 17.394531 24.003906 C 17.691406 23.878906 18.316406 23.570312 18.585938 23.417969 C 19.363281 22.980469 20.054688 22.492188 20.761719 21.878906 C 20.996094 21.671875 21.675781 20.996094 21.878906 20.761719 C 23.433594 18.972656 24.433594 16.886719 24.820312 14.621094 C 25.222656 12.246094 24.941406 9.808594 24.003906 7.605469 C 23.878906 7.308594 23.570312 6.683594 23.417969 6.414062 C 22.980469 5.636719 22.492188 4.945312 21.878906 4.238281 C 21.671875 4.003906 20.996094 3.324219 20.761719 3.121094 C 19.09375 1.671875 17.203125 0.722656 15.085938 0.269531 C 14.550781 0.15625 14.046875 0.0859375 13.28125 0.0234375 C 13.152344 0.0117188 11.390625 0.0078125 6.554688 0.00390625 L 0 0 Z M 15.59375 13.824219 C 17.289062 16.488281 18.671875 18.667969 18.671875 18.671875 C 18.667969 18.671875 10.53125 13.503906 9.027344 12.542969 L 8.957031 12.496094 L 10.726562 10.730469 C 11.699219 9.757812 12.496094 8.96875 12.503906 8.972656 C 12.507812 8.976562 13.898438 11.160156 15.59375 13.824219 Z M 15.59375 13.824219 " />
  </svg>
);

export const Shutter = () => (
  <img
    src="https://slog-iam.s3.ap-northeast-2.amazonaws.com/icon/shutter.png"
    alt="shutter"
    width="24"
    height="24"
  />
);

export const School = () => (
  <img
    src="https://slog-iam.s3.ap-northeast-2.amazonaws.com/icon/school.png"
    alt="School"
    width="24"
    height="24"
  />
);

export const Building = () => (
  <img
    src="https://postfiles.pstatic.net/MjAyMDAzMTFfMzEg/MDAxNTgzOTA5NjQ4ODk1.JgPLaVh_Jia-WTw0dFM-SSxTfMe7nMmid9Qvjl_uxIMg.IbbuORVazyUbDc1qu7jKNAaNNuJA5yCsQa09iouYnIQg.PNG.ertr777/company.png?type=w773"
    alt="Building"
    height="70"
  />
);

export const ClassRoom = () => (
  <img
    src="https://slog-iam.s3.ap-northeast-2.amazonaws.com/icon/classRoom.png"
    alt="ClassRoom"
    width="24"
    height="24"
  />
);

export const Next = () => (
  <img
    src="https://slog-iam.s3.ap-northeast-2.amazonaws.com/icon/Next_icon.png"
    alt="Next"
    width="24"
    height="24"
  />
);

export const Previous = () => (
  <img
    src="https://slog-iam.s3.ap-northeast-2.amazonaws.com/icon/Previous_icon.png"
    alt="Previous"
    width="24"
    height="24"
  />
);

export const Shop = () => (
  <svg
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M13.5 21c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m-6 2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m16.5-16h-2.964l-3.642 15h-13.321l-4.073-13.003h19.522l.728-2.997h3.75v1zm-22.581 2.997l3.393 11.003h11.794l2.674-11.003h-17.861z" />
  </svg>
);

export const Guide_white = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M5.495 2h16.505v-2h-17c-1.656 0-3 1.343-3 3v18c0 1.657 1.344 3 3 3h17v-20h-16.505c-1.376 0-1.376-2 0-2zm.505 4h14v16h-14v-16zm8.084 11.958c0 .575-.466 1.042-1.042 1.042-.573 0-1.04-.467-1.04-1.042 0-.576.467-1.042 1.04-1.042.576.001 1.042.467 1.042 1.042zm-1.008-8.958c-1.68 0-2.942 1.122-2.942 3.333h1.648c0-.96.377-1.746 1.26-1.746.52 0 1.07.345 1.118 1.004.051.694-.319 1.046-.788 1.493-1.219 1.158-1.174 1.688-1.174 2.999h1.644c0-.605-.066-1.045.766-1.941.554-.598 1.244-1.342 1.259-2.477.019-1.65-1.147-2.665-2.791-2.665z" />
  </svg>
);

export const Guide_black = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
  >
    <path d="M5.495 2h16.505v-2h-17c-1.657 0-3 1.343-3 3v18c0 1.657 1.343 3 3 3h17v-20h-16.505c-1.375 0-1.375-2 0-2zm6.681 17c-.573 0-1.04-.467-1.04-1.042 0-.576.467-1.042 1.04-1.042.576 0 1.042.466 1.042 1.042 0 .575-.466 1.042-1.042 1.042zm.034-10c1.644 0 2.81 1.015 2.79 2.666-.015 1.134-.705 1.878-1.259 2.477-.832.896-.766 1.336-.766 1.941h-1.644c0-1.311-.045-1.84 1.174-2.999.469-.446.839-.799.788-1.493-.048-.66-.599-1.004-1.118-1.004-.883 0-1.26.785-1.26 1.746h-1.647c0-2.212 1.262-3.334 2.942-3.334z" />
  </svg>
);

export const MyStudy = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M18.376 13.896l-2.376.479.479-2.375 1.897 1.896zm-1.425-2.368l1.896 1.896 5.153-5.153-1.896-1.896-5.153 5.153zm3.31 3.311l-.094.08v2.241c-3.927.269-6.853 1.148-8.25 1.649v-11.74c2.705-1.602 7.582-2.172 10.083-2.303v-1.766c-4.202.128-8.307.804-11 2.481-2.693-1.677-6.798-2.353-11-2.481v15.904c3.608.11 7.146.624 9.778 1.829.775.355 1.666.356 2.444 0 2.633-1.205 6.169-1.718 9.777-1.829v-5.804l-1.738 1.739zm-10.178 3.969c-1.397-.5-4.322-1.38-8.25-1.649v-12.228c4.727.356 6.9 1.341 8.25 2.14v11.737zm4.959-4.263l.177-1.066-2.219.549v1.019l2.042-.502z" />
  </svg>
);

export const Card = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="45"
    height="38"
    viewBox="0 0 24 24"
    fill="#0F4C82"
  >
    <path d="M22 4h-20c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-12c0-1.104-.896-2-2-2zm0 13.5c0 .276-.224.5-.5.5h-19c-.276 0-.5-.224-.5-.5v-6.5h20v6.5zm0-9.5h-20v-1.5c0-.276.224-.5.5-.5h19c.276 0 .5.224.5.5v1.5zm-9 6h-9v-1h9v1zm-3 2h-6v-1h6v1zm10-2h-3v-1h3v1z" />
  </svg>
);

export const NextSchedule = ({ onClick, cursor }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    onClick={onClick}
    cursor={cursor}
  >
    <path d="M14 12l-14 9v-18l14 9zm-4-9v4l8.022 5-8.022 5v4l14-9-14-9z" />
  </svg>
);

export const Coffee = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M10.49 0c-1.096 2.955 4.621 2.729-.116 6.999 1.526-3.097-3.665-3.182.116-6.999zm10.883 12.81c.327-.952.545-1.904.627-2.81h-3.912c-.029.395-.072.767-.109 1.148 1.279.257 2.439.843 3.394 1.662zm-13.779-5.81c3.154-2.825-.664-3.102.087-5.099-2.642 2.787.95 2.859-.087 5.099zm2.278 15h-2.667c-1.693-3.396-2.729-7.419-3.09-12h10.769c-.033.419-.082.812-.126 1.212.815-.195 1.381-.224 2.034-.198.097-.964.172-1.962.208-3.014h-15c.258 7.569 2.143 12.68 4 16h5.418c-.621-.574-1.147-1.247-1.546-2zm3.128-3.5c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5-3.5 1.57-3.5 3.5zm9 0c0 3.038-2.462 5.5-5.5 5.5s-5.5-2.462-5.5-5.5 2.462-5.5 5.5-5.5 5.5 2.462 5.5 5.5zm-3-.5v1h-3v-3h1v2h2z" />
  </svg>
);

export const Refresh = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z" />
  </svg>
);

export const Camera = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M18 5l-2-3h-8l-2 3h-6v17h24v-17h-6zm4 7h-4.079c.581 3.754-2.312 7-5.921 7-3.612 0-6.501-3.248-5.921-7h-4.079v-5h5.07l2-3h5.859l2 3h5.071v5zm-10-3c-2.243 0-4 1.73-4 3.939 0 2.239 1.794 4.061 4 4.061s4-1.822 4-4.061c0-2.209-1.757-3.939-4-3.939zm-.436 3.555c-.632.503-1.461.5-1.852-.006-.39-.506-.194-1.324.438-1.827.632-.502 1.461-.499 1.851.007.391.505.195 1.323-.437 1.826z" />
  </svg>
);

export const Film = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M22 1v2h-2v-2h-2v4h-12v-4h-2v2h-2v-2h-2v22h2v-2h2v2h2v-4h12v4h2v-2h2v2h2v-22h-2zm-18 18h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm14 9h-12v-8h12v8zm4 3h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2z" />
  </svg>
);

export const Person_white = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M20.822 18.096c-3.439-.794-6.641-1.49-5.09-4.418 4.719-8.912 1.251-13.678-3.732-13.678-5.082 0-8.465 4.949-3.732 13.678 1.598 2.945-1.725 3.641-5.09 4.418-2.979.688-3.178 2.143-3.178 4.663l.005 1.241h1.995c0-3.134-.125-3.55 1.838-4.003 2.851-.657 5.543-1.278 6.525-3.456.359-.795.592-2.103-.338-3.815-2.058-3.799-2.578-7.089-1.423-9.026 1.354-2.275 5.426-2.264 6.767-.034 1.15 1.911.639 5.219-1.403 9.076-.91 1.719-.671 3.023-.31 3.814.99 2.167 3.707 2.794 6.584 3.458 1.879.436 1.76.882 1.76 3.986h1.995l.005-1.241c0-2.52-.199-3.975-3.178-4.663z" />
  </svg>
);

export const Person_black = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
  >
    <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
  </svg>
);

export const People_white = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 36 36"
  >
    <path d="M 15.179688 24.097656 C 18.617188 23.300781 21.820312 22.605469 20.269531 19.675781 C 15.550781 10.765625 19.015625 6 24 6 C 29.082031 6 32.464844 10.949219 27.734375 19.679688 C 26.136719 22.625 29.457031 23.320312 32.824219 24.097656 C 35.800781 24.785156 36 26.238281 36 28.757812 L 35.996094 30 L 34.003906 30 C 34.003906 26.867188 34.125 26.449219 32.164062 25.996094 C 29.3125 25.339844 26.621094 24.71875 25.636719 22.539062 C 25.277344 21.746094 25.042969 20.4375 25.976562 18.726562 C 28.035156 14.929688 28.554688 11.636719 27.398438 9.699219 C 26.046875 7.425781 21.972656 7.4375 20.632812 9.667969 C 19.480469 11.578125 19.992188 14.886719 22.035156 18.742188 C 22.945312 20.460938 22.707031 21.765625 22.34375 22.558594 C 21.355469 24.722656 18.636719 25.351562 15.757812 26.015625 C 13.882812 26.449219 14 26.898438 14 30 L 12.003906 30 C 12.003906 26.707031 11.742188 24.890625 15.179688 24.097656 Z M 0.00390625 30 L 1.996094 30 C 1.996094 27.121094 1.71875 27.921875 4.734375 27.039062 C 6.253906 26.597656 7.597656 25.957031 8.207031 24.621094 C 8.523438 23.929688 8.738281 22.792969 7.964844 21.328125 C 6.535156 18.628906 6.136719 16.265625 6.894531 15.003906 C 7.714844 13.640625 10.300781 13.640625 11.125 15.027344 C 12.527344 17.378906 9.933594 21 9.59375 22.5 L 11.6875 22.5 C 12.347656 21 13.496094 19.1875 13.496094 16.648438 C 13.496094 13.636719 11.527344 12 9 12 C 5.261719 12 2.660156 15.574219 6.199219 22.257812 C 7.363281 24.453125 4.960938 24.976562 2.382812 25.570312 C 0.148438 26.089844 0 27.179688 0 29.074219 Z M 0.00390625 30 " />
  </svg>
);

export const People_black = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill={fill}
  >
    <path d="M 15.175781 24.097656 C 18.617188 23.300781 21.820312 22.605469 20.269531 19.679688 C 15.550781 10.765625 19.015625 6 24 6 C 29.082031 6 32.464844 10.949219 27.730469 19.679688 C 26.132812 22.625 29.457031 23.320312 32.824219 24.097656 C 35.800781 24.785156 36 26.242188 36 28.761719 L 35.996094 30 L 12.003906 30 C 12.003906 26.707031 11.742188 24.890625 15.175781 24.097656 Z M 0.00390625 30 L 9.003906 30 C 8.960938 20.1875 13.496094 24.453125 13.496094 16.648438 C 13.496094 13.636719 11.53125 12 9 12 C 5.261719 12 2.660156 15.574219 6.199219 22.257812 C 7.363281 24.453125 4.964844 24.976562 2.382812 25.570312 C 0.148438 26.089844 0 27.179688 0 29.070312 Z M 0.00390625 30 " />
  </svg>
);

export const Trash = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    onClick={onClick}
  >
    <path d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z" />
  </svg>
);

export const Edit = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    onClick={onClick}
    cursor="pointer"
  >
    <path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z" />
  </svg>
);

export const List = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
  >
    <path d="M4 22h-4v-4h4v4zm0-12h-4v4h4v-4zm0-8h-4v4h4v-4zm3 0v4h17v-4h-17zm0 12h17v-4h-17v4zm0 8h17v-4h-17v4z" />
  </svg>
);

export const Delete_12 = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    onClick={onClick}
    cursor="pointer"
  >
    <path d="M 6 1 C 8.757812 1 11 3.242188 11 6 C 11 8.757812 8.757812 11 6 11 C 3.242188 11 1 8.757812 1 6 C 1 3.242188 3.242188 1 6 1 Z M 6 0 C 2.6875 0 0 2.6875 0 6 C 0 9.3125 2.6875 12 6 12 C 9.3125 12 12 9.3125 12 6 C 12 2.6875 9.3125 0 6 0 Z M 9 8.269531 L 6.703125 5.996094 L 8.976562 3.703125 L 8.269531 3 L 5.996094 5.292969 L 3.703125 3.023438 L 3 3.726562 L 5.296875 6 L 3.023438 8.296875 L 3.726562 9 L 6.003906 6.703125 L 8.296875 8.976562 Z M 9 8.269531 " />
  </svg>
);

export const Timelapse = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M11 6v8h7v-2h-5v-6h-2zm10.854 7.683l1.998.159c-.132.854-.351 1.676-.652 2.46l-1.8-.905c.2-.551.353-1.123.454-1.714zm-2.548 7.826l-1.413-1.443c-.486.356-1.006.668-1.555.933l.669 1.899c.821-.377 1.591-.844 2.299-1.389zm1.226-4.309c-.335.546-.719 1.057-1.149 1.528l1.404 1.433c.583-.627 1.099-1.316 1.539-2.058l-1.794-.903zm-20.532-5.2c0 6.627 5.375 12 12.004 12 1.081 0 2.124-.156 3.12-.424l-.665-1.894c-.787.2-1.607.318-2.455.318-5.516 0-10.003-4.486-10.003-10s4.487-10 10.003-10c2.235 0 4.293.744 5.959 1.989l-2.05 2.049 7.015 1.354-1.355-7.013-2.184 2.183c-2.036-1.598-4.595-2.562-7.385-2.562-6.629 0-12.004 5.373-12.004 12zm23.773-2.359h-2.076c.163.661.261 1.344.288 2.047l2.015.161c-.01-.755-.085-1.494-.227-2.208z" />
  </svg>
);

export const Control = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M6 16h-6v-3h6v3zm-2-5v-10h-2v10h2zm-2 7v5h2v-5h-2zm13-7h-6v-3h6v3zm-2-5v-5h-2v5h2zm-2 7v10h2v-10h-2zm13 3h-6v-3h6v3zm-2-5v-10h-2v10h2zm-2 7v5h2v-5h-2z" />
  </svg>
);

export const Copy = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M21 2h-19v19h-2v-21h21v2zm3 2v20h-20v-20h20zm-2 2h-1.93c-.669 0-1.293.334-1.664.891l-1.406 2.109h-6l-1.406-2.109c-.371-.557-.995-.891-1.664-.891h-1.93v16h16v-16zm-3 6h-10v1h10v-1zm0 3h-10v1h10v-1zm0 3h-10v1h10v-1z" />
  </svg>
);

export const Copy2 = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2zm9.138-8.431h1.388l.78 1.157.771-1.157h1.345l-1.456 2.074 1.637 2.357h-1.389l-.926-1.397-.925 1.397h-1.363l1.594-2.331-1.456-2.1zm5.121 4.431v-.946c1.911-1.726 3.031-2.646 3.044-3.62 0-.545-.318-.977-1.09-.977-.575 0-1.08.288-1.43.545l-.442-1.111c.494-.38 1.286-.689 2.181-.689 1.522 0 2.345.884 2.345 2.087 0 1.431-1.304 2.494-2.396 3.404v.021h2.529v1.286h-4.741z" />
  </svg>
);

export const Information = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z" />
  </svg>
);

export const Out = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-16-7v20h14v-2h-12v-16h12v-2h-14z" />
  </svg>
);
