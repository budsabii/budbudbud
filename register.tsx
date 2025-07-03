// pages/register.tsx
import { useEffect, useState } from "react";
import liff from "@line/liff";

export default function RegisterPage() {
  const [profile, setProfile] = useState<any>(null);
  const [courseId, setCourseId] = useState("");
  const [empId, setEmpId] = useState("");

  useEffect(() => {
    liff.init({ liffId: "2004735926-kK8G6N9G" }).then(() => {
      if (!liff.isLoggedIn()) liff.login();
      else liff.getProfile().then(setProfile);
    });
  }, []);

  const handleRegister = async () => {
    const res = await fetch("https://script.google.com/macros/s/AKfycbzyvzWNPLZMzaaRbCRHg6oPuBoNT3iEs8ZGQzklBCe_68XOEJUkNXAGiokrcpyaf2ikHw/exec", {
      method: "POST",
      body: JSON.stringify({
        type: "register",
        empId: empId,
        name: profile?.displayName,
        lineId: profile?.userId,
        courseId: courseId,
      }),
    });

    alert("ลงทะเบียนสำเร็จ");
  };

  return (
    <div className="p-6">
      <h1>ลงทะเบียนคอร์สเรียน</h1>
      <input placeholder="Employee ID" onChange={e => setEmpId(e.target.value)} className="border p-2 m-2" />
      <input placeholder="Course ID (เช่น C001)" onChange={e => setCourseId(e.target.value)} className="border p-2 m-2" />
      <button onClick={handleRegister} className="bg-green-500 text-white px-4 py-2 mt-2">ลงทะเบียน</button>
    </div>
  );
}
