import MyBgColor from "../atom/myBgColor";
import MMyContainer from "../atom/myContainer";
import FooterBlock from "../templates/footer";
import NotificationBlock from "../templates/notification/notificationBlock";

export default function Notifications() {
  return (
    <main className="md:ml-[70px] lg:ml-[190px] relative">
      <img
        src="/posters7.webp"
        alt="poster"
        className="w-full h-full fixed object-cover -z-50"
      />
      <MyBgColor>
        <MMyContainer
          initial="hidden"
          animate="visible"
          className="gap-8 justify-start"
        >
          <NotificationBlock />
        </MMyContainer>
        <FooterBlock />
      </MyBgColor>
    </main>
  );
}
