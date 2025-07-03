// pages/evaluate.tsx
import { useEffect, useState } from "react";
import liff from "@line/liff";

export default function EvaluationPage() {
  const [profile, setProfile] = useState<any>(null);
  const [courseId, setCourseId] = useState("");
  const [empId, setEmpId] = useState("");
  const [empName, setEmpName] = useState("");

  useEffect(() => {
    liff.init({ liffId: "2004735926-kK8G6N9G" }).then(() => {
      if (!liff.isLoggedIn()) liff.login();
      else liff.getProfile().then(setProfile);
    });
  }, []);

  const handleEval = async () => {
    const res = await fetch("https://script.google.com/macros/s/AKfycbzyvzWNPLZMzaaRbCRHg6oPuBoNT3iEs8ZGQzklBCe_68XOEJUkNXAGiokrcpyaf2ikHw/exec", {
      method: "POST",
      body: JSON.stringify({
        type: "evaluation",
        courseId: courseId,
        empId: empId,
        name: empName,
        lineId: profile?.userId,
      }),
    });

    alert("ส่งผลการประเมินสำเร็จ");
  };

  return (
    <div className="p-6">
      <h1>ส่งผลการประเมิน</h1>
      <input placeholder="Course ID (เช่น C001)" onChange={e => setCourseId(e.target.value)} className="border p-2 m-2" />
      <input placeholder="Employee ID" onChange={e => setEmpId(e.target.value)} className="border p-2 m-2" />
      <input placeholder="Employee Name" onChange={e => setEmpName(e.target.value)} className="border p-2 m-2" />
      <button onClick={handleEval} className="bg-blue-500 text-white px-4 py-2 mt-2">ส่งแบบประเมิน</button>
    </div>
  );
}
