import "../styles/Home.css";
import profilePic from "../assets/photo/stdempimg.gif"; 

export default function Home() {
  return (
    <div className="home">
      <img src={profilePic} alt="Student" className="profile-pic" />
      <h2>รหัสนักศึกษา: 67160576</h2>
      <h3>ชื่อ-สกุล: นายกวินวีร์ อมรเธียรพงษ์</h3>
      <p>ชั้นปีที่ 2 | สาขา: วิทยาการคอมพิวเตอร์ | คณะคณะเทคโนโลยีสารสนเทศ</p>
      <p>สวัสดีครับ</p>
    </div>
  );
}
