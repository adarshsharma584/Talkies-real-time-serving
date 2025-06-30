import React from "react";

function User() {
  return (
    <div className="flex items-center gap-4 p-4  shadow-md rounded-lg max-w-[200px] m-1 h-[50px]">
      <div className="avatar avatar-online w-10">
        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
          <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Adarsh</h2>
        <p className="text-sm text-gray-500">Online</p>
      </div>
    </div>
  );
}

export default User;
