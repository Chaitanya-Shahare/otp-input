import React, { useEffect, useRef } from "react";
import { useState } from "react";

function OtpInput() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([...Array(4)]);

  const handleOnChange = (e, index) => {
    const value = e.target.value;

    if (isNaN(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleOnKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (inputRefs.current !== null) {
      inputRefs.current[0].focus();
    }
  }, []);
  return (
    <div className="otp">
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            value={value}
            ref={(el) => (inputRefs.current[index] = el)}
            maxLength={1}
            onChange={(e) => handleOnChange(e, index)}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
            style={{
              width: "40px",
              height: "40px",
            }}
          />
        );
      })}
    </div>
  );
}

export default OtpInput;
