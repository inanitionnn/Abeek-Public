import { memo } from "react";
import { MyContainer } from "../../atom/myContainer";
import { MyBlock } from "../../atom/myBlock";
import { MyHeader } from "../../atom/myHeader";
import { MyParagraph } from "../../atom/myParagraph";

const PolicyPage = memo(() => {
  return (
    <main className="md:ml-[70px] lg:ml-[190px] relative">
      <MyContainer className="justify-start" vwide={"sm"}>
        <MyBlock className="bg-base-200 items-start gap-6">
          <>
            <div>
              <MyHeader vsize={"xl"} className="text-start">
                Privacy Policy
              </MyHeader>
              <MyHeader className="text-start">
                Last updated September 16, 2023
              </MyHeader>
            </div>
            <MyParagraph className="text-start">
              This privacy notice for Abeek (
              <span className="font-bold">"we"</span>{" "}
              <span className="font-bold">"us"</span> or{" "}
              <span className="font-bold">"our"</span>), describes how and why
              we might collect, store, use, and/or share (
              <span className="font-bold">"process"</span>) your information
              when you use our services (
              <span className="font-bold">"Services"</span>
              ), such as when you:
            </MyParagraph>
            <ul className="list-inside list-disc">
              <li>
                Visit our website at{" "}
                <span className="link">https://www.abeek.pro</span>, or any
                website of ours that links to this privacy notice
              </li>
              <li>
                Engage with us in other related ways, including any sales,
                marketing, or events
              </li>
            </ul>
            <MyParagraph className="text-start">
              <span className="font-bold">Questions or concerns?</span> Reading
              this privacy notice will help you understand your privacy rights
              and choices. If you do not agree with our policies and practices,
              please do not use our Services. If you still have any questions or
              concerns, please contact us at tarolv3@gmail.com.
            </MyParagraph>
          </>
          {/* summary */}
          <>
            <MyHeader vsize={"lg"} className="text-start">
              Summary of key points
            </MyHeader>
            <MyParagraph className="text-start italic font-bold">
              This summary provides key points from our privacy notice, but you
              can find out more details about any of these topics by clicking
              the link following each key point or by using our{" "}
              <a href="#contetnsTable" className="link">
                table of contents
              </a>{" "}
              below to find the section you are looking for.
            </MyParagraph>
            <MyParagraph className="text-start">
              <span className="font-bold">
                What personal information do we process?
              </span>{" "}
              When you visit, use, or navigate our Services, we may process
              personal information depending on how you interact with us and the
              Services, the choices you make, and the products and features you
              use. Learn more about{" "}
              <a href="#informationCollects" className="link">
                personal information you disclose to us
              </a>
              .
            </MyParagraph>
            <MyParagraph className="text-start">
              <span className="font-bold">
                Do we process any sensitive personal information?
              </span>{" "}
              We do not process sensitive personal information.
            </MyParagraph>
            <MyParagraph className="text-start">
              <span className="font-bold">
                Do we receive any information from third parties
              </span>{" "}
              We do not receive any information from third parties.
            </MyParagraph>
            <MyParagraph className="text-start">
              <span className="font-bold">
                How do we process your information?
              </span>{" "}
              We process your information to provide, improve, and administer
              our Services, communicate with you, for security and fraud
              prevention, and to comply with law. We may also process your
              information for other purposes with your consent. We process your
              information only when we have a valid legal reason to do so. Learn
              more about{" "}
              <a href="#processCollection" className="link">
                how we process your information
              </a>
              .
            </MyParagraph>
            <MyParagraph className="text-start">
              <span className="font-bold">
                In what situations and with which parties do we share personal
                information?
              </span>{" "}
              We may share information in specific situations and with specific
              third parties. Learn more about{" "}
              <a href="#shareInformation" className="link">
                when and with whom we share your personal information
              </a>
            </MyParagraph>
            <MyParagraph className="text-start">
              <span className="font-bold">
                How do we keep your information safe?
              </span>{" "}
              We have organizational and technical processes and procedures in
              place to protect your personal information. However, no electronic
              transmission over the internet or information storage technology
              can be guaranteed to be 100% secure, so we cannot promise or
              guarantee that hackers, cybercriminals, or other unauthorized
              third parties will not be able to defeat our security and
              improperly collect, access, steal, or modify your information.
              Learn more about{" "}
              <a href="#informationSafe" className="link">
                how we keep your information safe
              </a>
              .
            </MyParagraph>
            <MyParagraph className="text-start">
              <span className="font-bold">What are your rights?</span> Depending
              on where you are located geographically, the applicable privacy
              law may mean you have certain rights regarding your personal
              information. Learn more about{" "}
              <a href="#privacyRights" className="link">
                your privacy rights
              </a>
              .
            </MyParagraph>
            <MyParagraph className="text-start">
              <span className="font-bold">
                How do you exercise your rights?
              </span>
              The easiest way to exercise your rights is by contacting us. We
              will consider and act upon any request in accordance with
              applicable data protection laws.
            </MyParagraph>
            <MyParagraph className="text-start">
              Want to learn more about what we do with any information we
              collect?{" "}
              <a href="#contetnsTable" className="link">
                Review the privacy notice in full
              </a>{" "}
              .
            </MyParagraph>
          </>
          {/* list */}
          <>
            <MyHeader id="contetnsTable" vsize={"lg"} className="text-start">
              Table of contents
            </MyHeader>
            <ul className="list-inside list-decimal">
              <li className="font-bold link">
                <a href="#informationCollects">
                  What information do we collect?
                </a>
              </li>
              <li className="font-bold link">
                <a href="#processCollection">
                  How do we process your information?
                </a>
              </li>
              <li className="font-bold link">
                <a href="#processInformation">
                  What legal bases do we rely on to process your information?
                </a>
              </li>
              <li className="font-bold link">
                <a href="#shareInformation">
                  When and with whom do we share your personal information?
                </a>
              </li>
              <li className="font-bold link">
                <a href="#thirdPartyWebsites">
                  What is our stance on third-party websites?
                </a>
              </li>
              <li className="font-bold link">
                <a href="#cookies">
                  Do we use cookies and other tracking technologies?
                </a>
              </li>

              <li className="font-bold link">
                <a href="#keepInformation">How long do we keep information?</a>
              </li>
              <li className="font-bold link">
                <a href="#informationSafe">
                  How do we keep your information safe?
                </a>
              </li>
              <li className="font-bold link">
                <a href="#minorsInformation">
                  Do we collect information from minors?
                </a>
              </li>
              <li className="font-bold link">
                <a href="#privacyRights">What are your privacy rights?</a>
              </li>
              <li className="font-bold link">
                <a href="#doNotTrackFeatures">
                  Controls for do-not-track features
                </a>
              </li>
              <li className="font-bold link">
                <a href="#californiaPrivacyRights">
                  Do California residents have specific privacy rights?
                </a>
              </li>
              <li className="font-bold link">
                <a href="#noticeUpdates">Do we make updates to this notice?</a>
              </li>
              <li className="font-bold link">
                <a href="#contacts">
                  How can you contact us about this notice?
                </a>
              </li>
              <li className="font-bold link">
                <a href="#deleteData">
                  How can you review, update, or delete the data we collect from
                  you?
                </a>
              </li>
            </ul>
          </>
          {/* 1 */}
          <>
            <MyHeader
              id="informationCollects"
              vsize={"lg"}
              className="text-start"
            >
              1. What information do we collect?
            </MyHeader>
            <MyParagraph className="text-start font-bold">
              Personal information you disclose to us
            </MyParagraph>
            <MyParagraph className="text-start">
              <span className="font-bold">In Short:</span> We collect personal
              information that you provide to us.
            </MyParagraph>
            <MyParagraph className="text-start font-bold">
              {" "}
              We collect personal information that you provide to us. We collect
              personal information that you voluntarily provide to us when you
              register on the Services, express an interest in obtaining
              information about us or our products and Services, when you
              participate in activities on the Services, or otherwise when you
              contact us.
            </MyParagraph>

            <MyParagraph className="text-start">
              <span className="font-bold">
                Personal Information Provided by You.
              </span>{" "}
              The personal information that we collect depends on the context of
              your interactions with us and the Services, the choices you make,
              and the products and features you use. The personal information we
              collect may include the following:
            </MyParagraph>
            <ul className="list-inside list-disc">
              <li>email addresses</li>
              <li>usernames</li>
              <li>passwords</li>
            </ul>

            <MyParagraph className="text-start">
              <span className="font-bold">Sensitive Information.</span> We do
              not process sensitive information.
            </MyParagraph>
            <MyParagraph>
              All personal information that you provide to us must be true,
              complete, and accurate, and you must notify us of any changes to
              such personal information.
            </MyParagraph>
          </>
          {/* 2 */}
          <>
            <MyHeader
              id="processCollection"
              vsize={"lg"}
              className="text-start"
            >
              2. How do we process your information?
            </MyHeader>
            <MyParagraph className="text-start italic">
              <span className="font-bold">In Short:</span>
              We process your information to provide, improve, and administer
              our Services, communicate with you, for security and fraud
              prevention, and to comply with law. We may also process your
              information for other purposes with your consent.
            </MyParagraph>
            <MyParagraph className="text-start font-bold">
              We process your personal information for a variety of reasons,
              depending on how you interact with our Services, including:
            </MyParagraph>

            <ul className="list-inside list-disc">
              <li>
                <span className="font-bold">
                  To facilitate account creation and authentication and
                  otherwise manage user accounts.
                </span>{" "}
                We may process your information so you can create and log in to
                your account, as well as keep your account in working order.
              </li>
              <li>
                <span className="font-bold">
                  To send you marketing and promotional communications.
                </span>{" "}
                We may process the personal information you send to us for our
                marketing purposes, if this is in accordance with your marketing
                preferences. You can opt out of our marketing emails at any
                time. For more information, see "
                <a href="#privacyRights" className="link">
                  What are your privacy rights?
                </a>
                " below.
              </li>
              <li>
                <span className="font-bold">
                  To save or protect an individual's vital interest.
                </span>{" "}
                We may process your information when necessary to save or
                protect an individual’s vital interest, such as to prevent harm
              </li>
            </ul>
          </>
          {/* 3 */}
          <>
            <MyHeader
              id="processInformation"
              vsize={"lg"}
              className="text-start"
            >
              3. What legal bases do we rely on to process your information?
            </MyHeader>
            <MyParagraph className="text-start italic">
              <span className="font-bold">In Short:</span> We only process your
              personal information when we believe it is necessary and we have a
              valid legal reason (i.e., legal basis) to do so under applicable
              law, like with your consent, to comply with laws, to provide you
              with services to enter into or fulfill our contractual
              obligations, to protect your rights, or to fulfill our legitimate
              business interests.
            </MyParagraph>
            <MyParagraph className="text-start">
              The General Data Protection Regulation (GDPR) and UK GDPR require
              us to explain the valid legal bases we rely on in order to process
              your personal information. As such, we may rely on the following
              legal bases to process your personal information:
            </MyParagraph>
            <ul className="list-inside list-disc">
              <li>
                <span className="font-bold">Consent.</span> We may process your
                information if you have given us permission (i.e., consent) to
                use your personal information for a specific purpose. You can
                withdraw your consent at any time. Learn more about withdrawing
                your consent.
              </li>
              <li>
                <span className="font-bold">Legitimate Interests.</span> We may
                process your information when we believe it is reasonably
                necessary to achieve our legitimate business interests and those
                interests do not outweigh your interests and fundamental rights
                and freedoms. For example, we may process your personal
                information for some of the purposes described in order to:
              </li>
              <ul className="list-inside list-disc ml-12">
                <li>
                  Send users information about special offers and discounts on
                  our products and services
                </li>
              </ul>

              <li>
                <span className="font-bold">Legal Obligations.</span> We may
                process your information where we believe it is necessary for
                compliance with our legal obligations, such as to cooperate with
                a law enforcement body or regulatory agency, exercise or defend
                our legal rights, or disclose your information as evidence in
                litigation in which we are involved.
              </li>
              <li>
                <span className="font-bold">Vital Interests.</span> We may
                process your information where we believe it is necessary to
                protect your vital interests or the vital interests of a third
                party, such as situations involving potential threats to the
                safety of any person.
              </li>
            </ul>
          </>
          {/* 4 */}
          <>
            <MyHeader id="shareInformation" vsize={"lg"} className="text-start">
              4. When and with whom do we share your personal information?
            </MyHeader>
            <MyParagraph className="text-start italic">
              <span className="font-bold">In Short:</span> We may share
              information in specific situations described in this section
              and/or with the following third parties.
            </MyParagraph>
            <MyParagraph className="text-start">
              We may need to share your personal information in the following
              situations:
            </MyParagraph>
            <ul className="list-inside list-disc">
              <li>
                <span className="font-bold"></span> We may share or transfer
                your information in connection with, or during negotiations of,
                any merger, sale of company assets, financing, or acquisition of
                all or a portion of our business to another company.
              </li>
            </ul>
          </>
          {/* 5 */}
          <>
            <MyHeader
              id="thirdPartyWebsites"
              vsize={"lg"}
              className="text-start"
            >
              5. What is our stance on third-party websites?
            </MyHeader>
            <MyParagraph className="text-start italic">
              <span className="font-bold">In Short:</span> We are not
              responsible for the safety of any information that you share with
              third parties that we may link to or who advertise on our
              Services, but are not affiliated with, our Services.
            </MyParagraph>
            <MyParagraph className="text-start">
              The Services may link to third-party websites, online services, or
              mobile applications and/or contain advertisements from third
              parties that are not affiliated with us and which may link to
              other websites, services, or applications. Accordingly, we do not
              make any guarantee regarding any such third parties, and we will
              not be liable for any loss or damage caused by the use of such
              third-party websites, services, or applications. The inclusion of
              a link towards a third-party website, service, or application does
              not imply an endorsement by us. We cannot guarantee the safety and
              privacy of data you provide to any third parties. Any data
              collected by third parties is not covered by this privacy notice.
              We are not responsible for the content or privacy and security
              practices and policies of any third parties, including other
              websites, services, or applications that may be linked to or from
              the Services. You should review the policies of such third parties
              and contact them directly to respond to your questions.
            </MyParagraph>
          </>
          {/* 6 */}
          <>
            <MyHeader id="cookies" vsize={"lg"} className="text-start">
              6. Do we use cookies and other tracking technologies?
            </MyHeader>
            <MyParagraph className="text-start italic">
              <span className="font-bold">In Short:</span> We may use cookies
              and other tracking technologies to collect and store your
              information.
            </MyParagraph>
            <MyParagraph className="text-start">
              We may use cookies and similar tracking technologies (like web
              beacons and pixels) to access or store information.
            </MyParagraph>
          </>
          {/* 7 */}
          <>
            <MyHeader id="keepInformation" vsize={"lg"} className="text-start">
              7. How long do we keep information?
            </MyHeader>
            <MyParagraph className="text-start italic">
              <span className="font-bold">In Short:</span> We keep your
              information for as long as necessary to fulfill the purposes
              outlined in this privacy notice unless otherwise required by law.
            </MyParagraph>
            <MyParagraph className="text-start">
              We will only keep your personal information for as long as it is
              necessary for the purposes set out in this privacy notice, unless
              a longer retention period is required or permitted by law (such as
              tax, accounting, or other legal requirements). No purpose in this
              notice will require us keeping your personal information for
              longer than the period of time in which users have an account with
              us.
            </MyParagraph>
            <MyParagraph className="text-start">
              When we have no ongoing legitimate business need to process your
              personal information, we will either delete or anonymize such
              information, or, if this is not possible (for example, because
              your personal information has been stored in backup archives),
              then we will securely store your personal information and isolate
              it from any further processing until deletion is possible.
            </MyParagraph>
          </>
          {/* 8 */}
          <>
            <MyHeader id="informationSafe" vsize={"lg"} className="text-start">
              8. How do we keep your information safe?
            </MyHeader>
            <MyParagraph className="text-start italic">
              <span className="font-bold">In Short:</span> We aim to protect
              your personal information through a system of organizational and
              technical security measures.
            </MyParagraph>
            <MyParagraph className="text-start">
              We have implemented appropriate and reasonable technical and
              organizational security measures designed to protect the security
              of any personal information we process. However, despite our
              safeguards and efforts to secure your information, no electronic
              transmission over the Internet or information storage technology
              can be guaranteed to be 100% secure, so we cannot promise or
              guarantee that hackers, cybercriminals, or other unauthorized
              third parties will not be able to defeat our security and
              improperly collect, access, steal, or modify your information.
              Although we will do our best to protect your personal information,
              transmission of personal information to and from our Services is
              at your own risk. You should only access the Services within a
              secure environment.
            </MyParagraph>
          </>
          {/* 9 */}
          <>
            <MyHeader
              id="minorsInformation"
              vsize={"lg"}
              className="text-start"
            >
              9. Do we collect information from minors?
            </MyHeader>
            <MyParagraph className="text-start italic">
              <span className="font-bold">In Short:</span> We do not knowingly
              collect data from or market to children under 18 years of age.
            </MyParagraph>
            <MyParagraph className="text-start">
              We do not knowingly solicit data from or market to children under
              18 years of age. By using the Services, you represent that you are
              at least 18 or that you are the parent or guardian of such a minor
              and consent to such minor dependent's use of the Services. If we
              learn that personal information from users less than 18 years of
              age has been collected, we will deactivate the account and take
              reasonable measures to promptly delete such data from our records.
              If you become aware of any data we may have collected from
              children under age 18, please contact us at tarolv3@gmail.com.
            </MyParagraph>
          </>
          {/* 10 */}
          <>
            <MyHeader id="privacyRights" vsize={"lg"} className="text-start">
              10. What are your privacy rights?
            </MyHeader>
            <MyParagraph className="text-start italic">
              <span className="font-bold">In Short:</span> In some regions, such
              as the European Economic Area (EEA), United Kingdom (UK), and
              Switzerland, you have rights that allow you greater access to and
              control over your personal information. You may review, change, or
              terminate your account at any time.
            </MyParagraph>
            <MyParagraph className="text-start">
              In some regions (like the EEA, UK, and Switzerland), you have
              certain rights under applicable data protection laws. These may
              include the right (i) to request access and obtain a copy of your
              personal information, (ii) to request rectification or erasure;
              (iii) to restrict the processing of your personal information;
              (vi) if applicable, to data portability; and (vii) not to be
              subject to automated decision-making. In certain circumstances,
              you may also have the right to object to the processing of your
              personal information. You can make such a request by contacting us
              by using the contact details provided in the section "{" "}
              <a href="#contacts" className="link">
                How can you contact us about this notice?
              </a>
              " below.
            </MyParagraph>
            <MyParagraph className="text-start">
              We will consider and act upon any request in accordance with
              applicable data protection laws.
            </MyParagraph>
            <MyParagraph className="text-start">
              If you are located in the EEA or UK and you believe we are
              unlawfully processing your personal information, you also have the
              right to complain to your
              <a
                href="https://ec.europa.eu/newsroom/article29/items/612080"
                className="link"
              >
                Member State data protection authority
              </a>{" "}
              or{" "}
              <a
                href="https://ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/"
                className="link"
              >
                UK data protection authority
              </a>
              .
            </MyParagraph>
            <MyParagraph className="text-start">
              If you are located in Switzerland, you may contact the{" "}
              <a
                href="https://www.edoeb.admin.ch/edoeb/en/home.html"
                className="link"
              >
                Federal Data Protection and Information Commissioner
              </a>
              .
            </MyParagraph>
            <MyParagraph className="text-start">
              <span className="font-bold">Withdrawing your consent:</span> If we
              are relying on your consent to process your personal information,
              you have the right to withdraw your consent at any time. You can
              withdraw your consent at any time by contacting us by using the
              contact details provided in the section "
              <a href="#contacts" className="link">
                How can you contact us about this notice?
              </a>
              " below or updating your preferences.
            </MyParagraph>
            <MyParagraph className="text-start">
              However, please note that this will not affect the lawfulness of
              the processing before its withdrawal nor, will it affect the
              processing of your personal information conducted in reliance on
              lawful processing grounds other than consent.
            </MyParagraph>
            <MyHeader className="text-start">Account information</MyHeader>
            <MyParagraph className="text-start">
              If you would at any time like to review or change the information
              in your account or terminate your account, you can:
            </MyParagraph>
            <ul className="list-inside list-disc">
              <li>
                Log in to your account settings and update your user account.
              </li>
              <li>Contact us using the contact information provided.</li>
            </ul>
            <MyParagraph className="text-start">
              Upon your request to terminate your account, we will deactivate or
              delete your account and information from our active databases.
              However, we may retain some information in our files to prevent
              fraud, troubleshoot problems, assist with any investigations,
              enforce our legal terms and/or comply with applicable legal
              requirements.
            </MyParagraph>
            <MyParagraph className="text-start">
              If you have questions or comments about your privacy rights, you
              may email us at tarolv3@gmail.com.
            </MyParagraph>
          </>
          {/* 11 */}
          <>
            <MyHeader
              id="doNotTrackFeatures"
              vsize={"lg"}
              className="text-start"
            >
              11. Controls for do-not-track features
            </MyHeader>
            <MyParagraph className="text-start">
              Most web browsers and some mobile operating systems and mobile
              applications include a Do-Not-Track ("DNT") feature or setting you
              can activate to signal your privacy preference not to have data
              about your online browsing activities monitored and collected. At
              this stage no uniform technology standard for recognizing and
              implementing DNT signals has been finalized. As such, we do not
              currently respond to DNT browser signals or any other mechanism
              that automatically communicates your choice not to be tracked
              online. If a standard for online tracking is adopted that we must
              follow in the future, we will inform you about that practice in a
              revised version of this privacy notice.
            </MyParagraph>
          </>
          {/* 12 */}
          <>
            <MyHeader
              id="californiaPrivacyRights"
              vsize={"lg"}
              className="text-start"
            >
              12. Do California residents have specific privacy rights?
            </MyHeader>
            <MyParagraph className="text-start italic">
              <span className="font-bold">In Short:</span> Yes, if you are a
              resident of California, you are granted specific rights regarding
              access to your personal information.
            </MyParagraph>
            <MyParagraph className="text-start">
              California Civil Code Section 1798.83, also known as the "Shine
              The Light" law, permits our users who are California residents to
              request and obtain from us, once a year and free of charge,
              information about categories of personal information (if any) we
              disclosed to third parties for direct marketing purposes and the
              names and addresses of all third parties with which we shared
              personal information in the immediately preceding calendar year.
              If you are a California resident and would like to make such a
              request, please submit your request in writing to us using the
              contact information provided below.
            </MyParagraph>
            <MyParagraph className="text-start">
              If you are under 18 years of age, reside in California, and have a
              registered account with Services, you have the right to request
              removal of unwanted data that you publicly post on the Services.
              To request removal of such data, please contact us using the
              contact information provided below and include the email address
              associated with your account and a statement that you reside in
              California. We will make sure the data is not publicly displayed
              on the Services, but please be aware that the data may not be
              completely or comprehensively removed from all our systems (e.g.,
              backups, etc.).
            </MyParagraph>
          </>
          {/* 13 */}
          <>
            <MyHeader id="noticeUpdates" vsize={"lg"} className="text-start">
              13. Do we make updates to this notice?
            </MyHeader>
            <MyParagraph className="text-start">
              <span className="font-bold">In Short:</span> Yes, we will update
              this notice as necessary to stay compliant with relevant laws.
            </MyParagraph>
            <MyParagraph className="text-start">
              We may update this privacy notice from time to time. The updated
              version will be indicated by an updated "Revised" date and the
              updated version will be effective as soon as it is accessible. If
              we make material changes to this privacy notice, we may notify you
              either by prominently posting a notice of such changes or by
              directly sending you a notification. We encourage you to review
              this privacy notice frequently to be informed of how we are
              protecting your information.
            </MyParagraph>
          </>
          {/* 14 */}
          <>
            <MyHeader id="contacts" vsize={"lg"} className="text-start">
              14. How can you contact us about this notice?
            </MyHeader>
            <MyParagraph className="text-start">
              If you have questions or comments about this notice, you may email
              us at tarolv3@gmail.com.
            </MyParagraph>
          </>
          {/* 15 */}
          <>
            <MyHeader id="deleteData" vsize={"lg"} className="text-start">
              15. How can you review, update, or delete the data we collect from
              you?
            </MyHeader>
            <MyParagraph className="text-start">
              Based on the applicable laws of your country, you may have the
              right to request access to the personal information we collect
              from you, change that information, or delete it. To request to
              review, update, or delete your personal information, please
              contact us.
            </MyParagraph>
          </>
        </MyBlock>
      </MyContainer>
    </main>
  );
});

export default PolicyPage;
