import { useEffect , useState } from "react";
import axios from "axios";
import Navbar from "./NavBar";
import { useNavigate } from "react-router-dom";
import "../css/UserDashboard.css"

const UserDashboard = () => {
  const navigate = useNavigate();
  const [username , setusername] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkingToken = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/user/verify-token",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const firstname = response.data.user.name.split(" ")[0][0];
        const lastname = response.data.user.name.split(" ")[1][0];
        setusername(firstname + "" + lastname);

        if(!response.data.valid) {
            localStorage.removeItem("token");
            navigate("/login");
            return ;
        }
        console.log(response);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
        return ;
        // console.log(error);
      }
    };
    checkingToken();
  });

  return (
    <div>
      <Navbar username={username}/>
      <div className="userdashboard_container">
        <div className="userdashboard_menu">
          menu
        </div>
        <div className="userdashboard_content">
          content
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore mollitia dolorem reprehenderit voluptatem ipsa magni accusantium quisquam deserunt tempora cum. Ullam repudiandae unde cum autem saepe quam nulla, ex perferendis sunt, quod odio quidem delectus corporis cumque amet illo? Illo quod similique commodi aperiam consequatur ad aliquam sit modi soluta esse quae vel eveniet aut voluptatem recusandae nobis voluptatibus id molestiae libero magni corrupti, eos corporis quo nesciunt! A debitis quam dolore praesentium maxime est provident voluptate alias quia at, ea aliquid asperiores cupiditate! Sequi velit necessitatibus natus molestiae expedita nisi, asperiores fugiat est repudiandae quo distinctio recusandae voluptatum repellendus obcaecati nemo incidunt quod iusto cum placeat sit, nesciunt eveniet possimus adipisci? Cum molestias nam quas natus! Ratione magnam quaerat eos quia quasi sunt cumque mollitia perspiciatis. Maiores, qui beatae ab nobis officia sequi eum sint esse sit. Illum laboriosam, corporis perspiciatis eos maiores repellat nisi tempore est sed obcaecati provident totam dolores esse officiis cum dignissimos eligendi magni saepe nesciunt rerum facere libero alias sapiente. Veniam est voluptates doloremque! Provident voluptatum magni ipsa obcaecati dolores eius earum iure sunt pariatur! Ullam, voluptatum ab quaerat adipisci officia aperiam, pariatur ratione nobis in, provident a atque eos recusandae repellat consequatur tenetur nostrum! Eum, quis eos ad veritatis, ratione atque velit rem accusamus vero ea nostrum dicta a veniam quisquam iure dignissimos exercitationem animi. Velit ad quod tenetur quidem officiis accusantium illum aspernatur placeat quaerat omnis, rem, soluta cumque aut, perferendis dolor. Sed ipsam laboriosam nihil eius molestias quidem dolorum? Eos sequi cumque harum, facilis aliquam, non sapiente accusantium cupiditate doloribus quod consequuntur hic illum quasi facere corrupti at exercitationem odit dolor temporibus qui culpa minima soluta quibusdam. Quis iure, aliquam voluptatum repellendus ab fugiat natus dolore suscipit exercitationem odio error ad quam. Sed cumque illo ad, cum voluptatibus ipsam est dolore quam aliquam, temporibus eos sapiente, tempore corporis ullam magni vero nam ipsa? Itaque expedita debitis animi provident et, impedit officiis neque recusandae, pariatur doloremque a reiciendis unde hic nesciunt ipsum quas sequi exercitationem cum esse necessitatibus quo molestiae! Fuga aspernatur ipsam quasi sapiente vero voluptatem illum? Saepe sapiente accusamus exercitationem dolore cumque, laboriosam beatae labore, unde reprehenderit asperiores ea laudantium fuga. Tempore voluptates laboriosam aut quibusdam harum fugit adipisci dignissimos molestias quisquam iure unde facere distinctio ipsam quia facilis, vitae eos iste deleniti, assumenda magni voluptatum sequi doloremque officiis! Vero, adipisci natus ullam, accusantium impedit nihil consequatur obcaecati ratione aliquam, veritatis neque voluptatem harum. Rerum, beatae molestiae, eveniet aperiam et blanditiis deserunt accusantium repudiandae fuga culpa quod maxime vitae distinctio facere. Id, ut. Autem amet dolores, delectus quos fuga unde quis ullam atque numquam dolor tenetur eius ut assumenda minus soluta cum quaerat officia eos consequatur nesciunt perspiciatis? Quam distinctio aliquam nesciunt tenetur fugiat voluptatem aut nobis dignissimos aspernatur. Obcaecati dolores dolorum vitae nemo totam unde tenetur mollitia debitis corporis esse quibusdam ut amet quas beatae dignissimos eaque, ea quidem quia placeat, doloribus similique aut! Commodi nesciunt voluptates tempore in quia perspiciatis rem enim asperiores, harum maxime dolore magni eligendi atque minus cumque vitae provident temporibus, doloribus ea. Porro praesentium adipisci repudiandae, inventore eos enim minus nemo quod ipsum fugit itaque maiores, dicta, ex a dolores facilis ea officia amet. Voluptatum, harum consequuntur. Facere, eveniet! Inventore provident quos dolorem quaerat ea ipsam distinctio error dicta, maxime, in nisi odit sed illo saepe earum reprehenderit mollitia consequuntur, molestiae consequatur excepturi commodi laudantium temporibus iure explicabo? Minima a voluptatibus mollitia qui laudantium voluptatum, amet delectus ut distinctio cumque, repellat quidem eos aliquam nulla natus? Autem voluptatem ullam corrupti iste nihil. Modi inventore ducimus recusandae fugiat molestias? Aperiam explicabo odio in illum exercitationem! At quos laboriosam quibusdam perspiciatis quas a est nemo dolorem quis suscipit, culpa quasi, voluptate alias amet fuga. Culpa maxime, ipsum rerum ex tempora molestiae dignissimos quo voluptatem sapiente, eveniet sit ducimus doloremque reiciendis tempore doloribus eligendi repudiandae iste minus hic accusamus. Omnis accusantium impedit a tenetur itaque hic, eligendi quibusdam. Veniam adipisci alias nesciunt quo iste quaerat pariatur aliquam repellat minima, cupiditate ipsam labore recusandae, qui iusto provident. Magnam quo iure repudiandae qui, eligendi similique odio asperiores dignissimos voluptatem fugiat autem commodi dicta iusto rem pariatur enim vero temporibus aliquam hic alias officiis. Dolorem vero eveniet doloremque ad saepe earum ullam dignissimos voluptate sequi quisquam aliquid error velit fuga, placeat commodi inventore ducimus quibusdam fugit tempore explicabo cum doloribus? Deleniti corrupti quae fugiat quos saepe consectetur ut, quia dolores. Dignissimos facere deleniti modi! Libero alias quibusdam enim quod. Perferendis architecto veniam deleniti minus, aperiam nesciunt repellat quas eum sint neque hic velit aliquam consequuntur non provident pariatur veritatis tempora iste recusandae? Sint veritatis alias ipsam dolorum recusandae ratione quas mollitia ducimus magni consectetur rem quasi aspernatur vero ullam vitae nisi voluptatem molestias nihil rerum corrupti tempora, harum maxime, autem vel! Quis fuga omnis assumenda accusantium tempore quaerat numquam. Obcaecati molestiae consectetur iusto id aut nam! Magni in libero nesciunt ut aliquam! Neque cupiditate delectus voluptas ex eligendi earum totam blanditiis, expedita ducimus amet inventore explicabo aliquid iste officiis odio autem dolor suscipit! Sed repellendus veniam officia consequatur eum non impedit sit sequi, voluptatum dolor exercitationem delectus modi labore a minus voluptate doloribus enim, fugiat asperiores magnam excepturi! Nihil repudiandae aliquam saepe optio quis rerum? Dolores voluptas quidem aperiam eveniet, ut, molestias quaerat iusto omnis dolorem eligendi aliquid laboriosam itaque consequuntur quos ipsam repellendus obcaecati! Doloribus ipsum pariatur omnis culpa cum, quisquam debitis ipsam itaque consequuntur provident molestias nostrum officiis, veritatis, nemo maiores quos natus architecto placeat dolore. Aspernatur, odit maxime. Cupiditate voluptates qui tempora itaque reiciendis, blanditiis unde, id voluptate cum molestias consequuntur ipsa odio eaque, quibusdam assumenda doloremque. Quasi consectetur, voluptates tenetur nostrum est impedit vitae officiis, odit, sed illum ab aliquam harum beatae quae culpa temporibus voluptatum nulla dolore? Nobis, impedit illo fugiat deserunt molestias accusantium eveniet sed enim reprehenderit suscipit, sint sit? Eius, est? Aliquid expedita necessitatibus fuga saepe est harum tempore eos, dignissimos obcaecati quo eligendi porro officiis distinctio alias sapiente architecto laboriosam molestiae! Velit voluptatem quos, repellendus culpa nostrum magni itaque error saepe sit.
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
