import { memo } from "react";
import { MyContainer } from "../../atom/myContainer";
import { MyBlock } from "../../atom/myBlock";
import { MyHeader } from "../../atom/myHeader";
import { MyParagraph } from "../../atom/myParagraph";

const TermsPage = memo(() => {
  return (
    <main className="md:ml-[70px] lg:ml-[190px] relative">
      <MyContainer className="justify-start" vwide={"sm"}>
        <MyBlock className="bg-base-200 items-start gap-6">
          <>
            <div>
              <MyHeader vsize={"xl"} className="text-start">
                Terms of use
              </MyHeader>
              <MyHeader className="text-start">
                Last updated September 16, 2023
              </MyHeader>
            </div>
            <MyHeader vsize={"lg"} className="text-start">
              Agreement to our legal terms
            </MyHeader>
            <MyParagraph className="text-start">
              We are (<span className="font-bold">"we"</span>{" "}
              <span className="font-bold">"us"</span> or{" "}
              <span className="font-bold">"our"</span>).
            </MyParagraph>
            <MyParagraph className="text-start">
              We operate, as well as any other related products and services
              that refer or link to these legal terms (the "
              <span className="font-bold">Legal Terms</span>
              ") (collectively, the "<span className="font-bold">Services</span>
              ").
            </MyParagraph>
            <MyParagraph className="text-start">
              You can contact us by email at tarolv3@gmail.com.
            </MyParagraph>
            <MyParagraph className="text-start">
              These Legal Terms constitute a legally binding agreement made
              between you, whether personally or on behalf of an entity ("
              <span className="font-bold">you</span>"), and concerning your
              access to and use of the Services. You agree that by accessing the
              Services, you have read, understood, and Abeek, agreed to be bound
              by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE
              LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE
              SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
            </MyParagraph>
            <MyParagraph className="text-start">
              Supplemental terms and conditions or documents that may be posted
              on the Services from time to time are hereby expressly
              incorporated herein by reference. We reserve the right, in our
              sole discretion, to make changes or modifications to these Legal
              Terms at any time and for any reason. We will alert you about any
              changes by updating the "Last updated" date of these Legal Terms,
              and you waive any right to receive specific notice of each such
              change. It is your responsibility to periodically review these
              Legal Terms to stay informed of updates. You will be subject to,
              and will be deemed to have been made aware of and to have
              accepted, the changes in any revised Legal Terms by your continued
              use of the Services after the date such revised Legal Terms are
              posted.
            </MyParagraph>
          </>
          {/* list */}
          <>
            <MyHeader id="contetnsTable" vsize={"lg"} className="text-start">
              Table of contents
            </MyHeader>
            <ul className="list-inside list-decimal">
              <li className="font-bold link">
                <a href="#ourServices">Our services</a>
              </li>
              <li className="font-bold link">
                <a href="#intellectualRights">Intellectual property rights</a>
              </li>
              <li className="font-bold link">
                <a href="#userRepresentations">User representations</a>
              </li>
              <li className="font-bold link">
                <a href="#prohibitedActivities">Prohibited activities</a>
              </li>
              <li className="font-bold link">
                <a href="#userContributions">User generated contributions</a>
              </li>
              <li className="font-bold link">
                <a href="#contributionLicense">Contribution license</a>
              </li>
              <li className="font-bold link">
                <a href="#servicesManagement">Services management</a>
              </li>
              <li className="font-bold link">
                <a href="#termAndTermination">Term and termination</a>
              </li>
              <li className="font-bold link">
                <a href="#modifications">Modifications and interruptions</a>
              </li>
              <li className="font-bold link">
                <a href="#disputeResolution">Dispute resolution</a>
              </li>
              <li className="font-bold link">
                <a href="#corrections">Corrections</a>
              </li>
              <li className="font-bold link">
                <a href="#disclaimer">Disclaimer</a>
              </li>
              <li className="font-bold link">
                <a href="#limitations">Limitations of liability</a>
              </li>
              <li className="font-bold link">
                <a href="#indemnification">Indemnification</a>
              </li>
              <li className="font-bold link">
                <a href="#userData">User data</a>
              </li>
              <li className="font-bold link">
                <a href="#transactions">
                  Electronic communications, transactions, and signatures
                </a>
              </li>
              <li className="font-bold link">
                <a href="#miscellaneous">Miscellaneous</a>
              </li>
              <li className="font-bold link">
                <a href="#contacts">Contact us</a>
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
              1. Our services
            </MyHeader>
            <MyParagraph className="text-start">
              The information provided when using the Services is not intended
              for distribution to or use by any person or entity in any
              jurisdiction or country where such distribution or use would be
              contrary to law or regulation or which would subject us to any
              registration requirement within such jurisdiction or country.
              Accordingly, those persons who choose to access the Services from
              other locations do so on their own initiative and are solely
              responsible for compliance with local laws, if and to the extent
              local laws are applicable.
            </MyParagraph>
          </>
          {/* 2 */}
          <>
            <MyHeader
              id="intellectualRights"
              vsize={"lg"}
              className="text-start"
            >
              2. Intellectual property rights
            </MyHeader>
            <MyHeader className="text-start">
              Our intellectual property
            </MyHeader>
            <MyParagraph className="text-start">
              We are the owner or the licensee of all intellectual property
              rights in our Services, including all source code, databases,
              functionality, software, website designs, audio, video, text,
              photographs, and graphics in the Services (collectively, the
              "Content"), as well as the trademarks, service marks, and logos
              contained therein (the "Marks"). Our Content and Marks are
              protected by copyright and trademark laws (and various other
              intellectual property rights and unfair competition laws) and
              treaties in the United States and around the world.
            </MyParagraph>
            <MyParagraph className="text-start">
              The Content and Marks are provided in or through the Services "AS
              IS" for your personal, non-commercial use or internal business
              purpose only.
            </MyParagraph>
            <MyHeader className="text-start">Your use of our Services</MyHeader>
            <MyParagraph className="text-start">
              Subject to your compliance with these Legal Terms, including the "
              <a href="#prohibitedActivities" className="link">
                Prohibited activities
              </a>
              " section below, we grant you a non-exclusive, non-transferable,
              revocable license to:
            </MyParagraph>
            <ul className="list-inside list-disc">
              <li>access the Services.</li>
              <li>
                download or print a copy of any portion of the Content to which
                you have properly gained access.
              </li>
            </ul>
            <MyParagraph className="text-start">
              solely for your personal, non-commercial use or internal business
              purpose.
            </MyParagraph>
            <MyParagraph className="text-start">
              Except as set out in this section or elsewhere in our Legal Terms,
              no part of the Services and no Content or Marks may be copied,
              reproduced, aggregated, republished, uploaded, posted, publicly
              displayed, encoded, translated, transmitted, distributed, sold,
              licensed, or otherwise exploited for any commercial purpose
              whatsoever, without our express prior written permission.
            </MyParagraph>
            <MyParagraph className="text-start">
              If you wish to make any use of the Services, Content, or Marks
              other than as set out in this section or elsewhere in our Legal
              Terms, please address your request to: tarolv3@gmail.com. If we
              ever grant you the permission to post, reproduce, or publicly
              display any part of our Services or Content, you must identify us
              as the owners or licensors of the Services, Content, or Marks and
              ensure that any copyright or proprietary notice appears or is
              visible on posting, reproducing, or displaying our Content.
            </MyParagraph>
            <MyParagraph className="text-start">
              We reserve all rights not expressly granted to you in and to the
              Services, Content, and Marks.
            </MyParagraph>
            <MyParagraph className="text-start">
              Any breach of these Intellectual Property Rights will constitute a
              material breach of our Legal Terms and your right to use our
              Services will terminate immediately.
            </MyParagraph>
            <MyHeader className="text-start">Your submissions</MyHeader>
            <MyParagraph className="text-start">
              Please review this section and the "
              <a href="#prohibitedActivities" className="link">
                Prohibited activities
              </a>
              " section carefully prior to using our Services to understand the
              (a) rights you give us and (b) obligations you have when you post
              or upload any content through the Services.
            </MyParagraph>
            <MyParagraph className="text-start">
              <span className="font-bold">Submissions:</span> By directly
              sending us any question, comment, suggestion, idea, feedback, or
              other information about the Services ("Submissions"), you agree to
              assign to us all intellectual property rights in such Submission.
              You agree that we shall own this Submission and be entitled to its
              unrestricted use and dissemination for any lawful purpose,
              commercial or otherwise, without acknowledgment or compensation to
              you.
            </MyParagraph>
            <MyParagraph className="text-start">
              <span className="font-bold">
                You are responsible for what you post or upload:
              </span>{" "}
              By sending us Submissions through any part of the Services you:
            </MyParagraph>
            <ul className="list-inside list-disc">
              <li>
                confirm that you have read and agree with our "
                <a href="#prohibitedActivities" className="link">
                  Prohibited activities
                </a>
                " and will not post, send, publish, upload, or transmit through
                the Services any Submission that is illegal, harassing, hateful,
                harmful, defamatory, obscene, bullying, abusive, discriminatory,
                threatening to any person or group, sexually explicit, false,
                inaccurate, deceitful, or misleading;
              </li>
              <li>
                to the extent permissible by applicable law, waive any and all
                moral rights to any such Submission;
              </li>
              <li>
                warrant that any such Submission are original to you or that you
                have the necessary rights and licenses to submit such
                Submissions and that you have full authority to grant us the
                above-mentioned rights in relation to your Submissions;
              </li>
              <li>
                warrant and represent that your Submissions do not constitute
                confidential information.
              </li>
            </ul>
            <MyParagraph className="text-start">
              You are solely responsible for your Submissions and you expressly
              agree to reimburse us for any and all losses that we may suffer
              because of your breach of (a) this section, (b) any third party's
              intellectual property rights, or (c) applicable law.
            </MyParagraph>
          </>
          {/* 3 */}
          <>
            <MyHeader
              id="userRepresentations"
              vsize={"lg"}
              className="text-start"
            >
              3. User representations
            </MyHeader>
            <MyParagraph className="text-start">
              By using the Services, you represent and warrant that: (1) you
              have the legal capacity and you agree to comply with these Legal
              Terms; (2) you are not a minor in the jurisdiction in which you
              reside; (3) you will not access the Services through automated or
              non-human means, whether through a bot, script or otherwise; (4)
              you will not use the Services for any illegal or unauthorized
              purpose; and (5) your use of the Services will not violate any
              applicable law or regulation.
            </MyParagraph>
            <MyParagraph className="text-start">
              If you provide any information that is untrue, inaccurate, not
              current, or incomplete, we have the right to suspend or terminate
              your account and refuse any and all current or future use of the
              Services (or any portion thereof).
            </MyParagraph>
          </>
          {/* 4 */}
          <>
            <MyHeader
              id="prohibitedActivities"
              vsize={"lg"}
              className="text-start"
            >
              4. Prohibited activities
            </MyHeader>
            <MyParagraph className="text-start">
              You may not access or use the Services for any purpose other than
              that for which we make the Services available. The Services may
              not be used in connection with any commercial endeavors except
              those that are specifically endorsed or approved by us.
            </MyParagraph>
            <MyParagraph className="text-start">
              As a user of the Services, you agree not to:
            </MyParagraph>
            <ul className="list-inside list-disc">
              <li>
                Systematically retrieve data or other content from the Services
                to create or compile, directly or indirectly, a collection,
                compilation, database, or directory without written permission
                from us.
              </li>
              <li>
                Trick, defraud, or mislead us and other users, especially in any
                attempt to learn sensitive account information such as user
                passwords.
              </li>
              <li>
                Circumvent, disable, or otherwise interfere with
                security-related features of the Services, including features
                that prevent or restrict the use or copying of any Content or
                enforce limitations on the use of the Services and/or the
                Content contained therein.
              </li>
              <li>
                Disparage, tarnish, or otherwise harm, in our opinion, us and/or
                the Services.
              </li>
              <li>
                Use any information obtained from the Services in order to
                harass, abuse, or harm another person.
              </li>
              <li>
                Make improper use of our support services or submit false
                reports of abuse or misconduct.
              </li>
              <li>
                Use the Services in a manner inconsistent with any applicable
                laws or regulations.
              </li>
              <li>
                Engage in unauthorized framing of or linking to the Services.
              </li>
              <li>
                Upload or transmit (or attempt to upload or to transmit)
                viruses, Trojan horses, or other material, including excessive
                use of capital letters and spamming (continuous posting of
                repetitive text), that interferes with any party's uninterrupted
                use and enjoyment of the Services or modifies, impairs,
                disrupts, alters, or interferes with the use, features,
                functions, operation, or maintenance of the Services.
              </li>
              <li>
                Engage in any automated use of the system, such as using scripts
                to send comments or messages, or using any data mining, robots,
                or similar data gathering and extraction tools.
              </li>
              <li>
                Delete the copyright or other proprietary rights notice from any
                Content.
              </li>
              <li>
                Attempt to impersonate another user or person or use the
                username of another user.
              </li>
              <li>
                Upload or transmit (or attempt to upload or to transmit) any
                material that acts as a passive or active information collection
                or transmission mechanism, including without limitation, clear
                graphics interchange formats ("gifs"), 1x1 pixels, web bugs,
                cookies, or other similar devices (sometimes referred to as
                "spyware" or "passive collection mechanisms" or "pcms").
              </li>
              <li>
                Interfere with, disrupt, or create an undue burden on the
                Services or the networks or services connected to the Services.
              </li>
              <li>
                Harass, annoy, intimidate, or threaten any of our employees or
                agents engaged in providing any portion of the Services to you.
              </li>
              <li>
                Attempt to bypass any measures of the Services designed to
                prevent or restrict access to the Services, or any portion of
                the Services.
              </li>
              <li>
                Copy or adapt the Services' software, including but not limited
                to Flash, PHP, HTML, JavaScript, or other code.
              </li>
              <li>
                Except as permitted by applicable law, decipher, decompile,
                disassemble, or reverse engineer any of the software comprising
                or in any way making up a part of the Services.
              </li>
              <li>
                Except as may be the result of standard search engine or
                Internet browser usage, use, launch, develop, or distribute any
                automated system, including without limitation, any spider,
                robot, cheat utility, scraper, or offline reader that accesses
                the Services, or use or launch any unauthorized script or other
                software.
              </li>
              <li>
                Make any unauthorized use of the Services, including collecting
                usernames and/or email addresses of users by electronic or other
                means for the purpose of sending unsolicited email, or creating
                user accounts by automated means or under false pretenses.
              </li>
              <li>
                {" "}
                Use a buying agent or purchasing agent to make purchases on the
                Services.
              </li>
              <li>
                Use the Services as part of any effort to compete with us or
                otherwise use the Services and/or the Content for any
                revenue-generating endeavor or commercial enterprise.
              </li>
            </ul>
          </>
          {/* 5 */}
          <>
            <MyHeader
              id="userContributions"
              vsize={"lg"}
              className="text-start"
            >
              5. User generated contributions
            </MyHeader>
            <MyParagraph className="text-start">
              The Services does not offer users to submit or post content. We
              may provide you with the opportunity to create, submit, post,
              display, transmit, perform, publish, distribute, or broadcast
              content and materials to us or on the Services, including but not
              limited to text, writings, video, audio, photographs, graphics,
              comments, suggestions, or personal information or other material
              (collectively, "Contributions"). Contributions may be viewable by
              other users of the Services and through third-party websites. When
              you create or make available any Contributions, you thereby
              represent and warrant that:
            </MyParagraph>
          </>
          {/* 6 */}
          <>
            <MyHeader
              id="contributionLicense"
              vsize={"lg"}
              className="text-start"
            >
              6. Contribution license
            </MyHeader>
            <MyParagraph className="text-start">
              You and Services agree that we may access, store, process, and use
              any information and personal data that you provide and your
              choices (including settings).
            </MyParagraph>
            <MyParagraph className="text-start">
              By submitting suggestions or other feedback regarding the
              Services, you agree that we can use and share such feedback for
              any purpose without compensation to you.
            </MyParagraph>
            <MyParagraph className="text-start">
              We do not assert any ownership over your Contributions. You retain
              full ownership of all of your Contributions and any intellectual
              property rights or other proprietary rights associated with your
              Contributions. We are not liable for any statements or
              representations in your Contributions provided by you in any area
              on the Services. You are solely responsible for your Contributions
              to the Services and you expressly agree to exonerate us from any
              and all responsibility and to refrain from any legal action
              against us regarding your Contributions.
            </MyParagraph>
          </>
          {/* 7 */}
          <>
            <MyHeader
              id="servicesManagement"
              vsize={"lg"}
              className="text-start"
            >
              7. Services management
            </MyHeader>
            <MyParagraph className="text-start">
              We reserve the right, but not the obligation, to: (1) monitor the
              Services for violations of these Legal Terms; (2) take appropriate
              legal action against anyone who, in our sole discretion, violates
              the law or these Legal Terms, including without limitation,
              reporting such user to law enforcement authorities; (3) in our
              sole discretion and without limitation, refuse, restrict access
              to, limit the availability of, or disable (to the extent
              technologically feasible) any of your Contributions or any portion
              thereof, (4) in our sole discretion and without limitation,
              notice, or liability, to remove from the Services or otherwise
              disable all files and content that are excessive in size or are in
              any way burdensome to our systems; and (5) otherwise manage the
              Services in a manner designed to protect our rights and property
              and to facilitate the proper functioning of the Services.
            </MyParagraph>
          </>
          {/* 8 */}
          <>
            <MyHeader
              id="termAndTermination"
              vsize={"lg"}
              className="text-start"
            >
              8. Term and termination
            </MyHeader>
            <MyParagraph className="text-start">
              These Legal Terms shall remain in full force and effect while you
              use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE
              LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND
              WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE
              SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON
              FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR
              BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN
              THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY
              TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE ANY
              CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT
              WARNING, IN OUR SOLE DISCRETION.
            </MyParagraph>
            <MyParagraph className="text-start">
              If we terminate or suspend your account for any reason, you are
              prohibited from registering and creating a new account under your
              name, a fake or borrowed name, or the name of any third party,
              even if you may be acting on behalf of the third party. In
              addition to terminating or suspending your account, we reserve the
              right to take appropriate legal action, including without
              limitation pursuing civil, criminal, and injunctive redress.
            </MyParagraph>
          </>
          {/* 9 */}
          <>
            <MyHeader id="modifications" vsize={"lg"} className="text-start">
              9. Modifications and interruptions
            </MyHeader>
            <MyParagraph className="text-start">
              We reserve the right to change, modify, or remove the contents of
              the Services at any time or for any reason at our sole discretion
              without notice. However, we have no obligation to update any
              information on our Services. We will not be liable to you or any
              third party for any modification, price change, suspension, or
              discontinuance of the Services.
            </MyParagraph>
            <MyParagraph className="text-start">
              We cannot guarantee the Services will be available at all times.
              We may experience hardware, software, or other problems or need to
              perform maintenance related to the Services, resulting in
              interruptions, delays, or errors. We reserve the right to change,
              revise, update, suspend, discontinue, or otherwise modify the
              Services at any time or for any reason without notice to you. You
              agree that we have no liability whatsoever for any loss, damage,
              or inconvenience caused by your inability to access or use the
              Services during any downtime or discontinuance of the Services.
              Nothing in these Legal Terms will be construed to obligate us to
              maintain and support the Services or to supply any corrections,
              updates, or releases in connection therewith.
            </MyParagraph>
          </>
          {/* 10 */}
          <>
            <MyHeader
              id="disputeResolution"
              vsize={"lg"}
              className="text-start"
            >
              10. Dispute resolution
            </MyHeader>
            <MyHeader className="text-start">Informal Negotiations</MyHeader>
            <MyParagraph className="text-start">
              To expedite resolution and control the cost of any dispute,
              controversy, or claim related to these Legal Terms (each a
              "Dispute" and collectively, the "Disputes") brought by either you
              or us (individually, a "Party" and collectively, the "Parties"),
              the Parties agree to first attempt to negotiate any Dispute
              (except those Disputes expressly provided below) informally for at
              least _days before initiating arbitration. Such informal
              negotiations commence upon written notice from one Party to the
              other Party.
            </MyParagraph>
            <MyHeader className="text-start">Binding Arbitration</MyHeader>
            <MyParagraph className="text-start">
              Any dispute arising out of or in connection with these Legal
              Terms, including any question regarding its existence, validity,
              or termination, shall be referred to and finally resolved by the
              International Commercial Arbitration Court under the European
              Arbitration Chamber (Belgium, Brussels, Avenue Louise, 146)
              according to the Rules of this ICAC, which, as a result of
              referring to it, is considered as the part of this clause. The
              number of arbitrators shall be The seat, or legal place, or
              arbitration shall be The language of the proceedings shall be The
              governing law of these Legal Terms shall be substantive law of
            </MyParagraph>
            <MyHeader className="text-start">Restrictions</MyHeader>
            <MyParagraph className="text-start">
              The Parties agree that any arbitration shall be limited to the
              Dispute between the Parties individually. To the full extent
              permitted by law, (a) no arbitration shall be joined with any
              other proceeding; (b) there is no right or authority for any
              Dispute to be arbitrated on a class-action basis or to utilize
              class action procedures; and (c) there is no right or authority
              for any Dispute to be brought in a purported representative
              capacity on behalf of the general public or any other persons.
            </MyParagraph>
            <MyHeader className="text-start">
              Exceptions to Informal Negotiations and Arbitration
            </MyHeader>
            <MyParagraph className="text-start">
              The Parties agree that the following Disputes are not subject to
              the above provisions concerning informal negotiations binding
              arbitration: (a) any Disputes seeking to enforce or protect, or
              concerning the validity of, any of the intellectual property
              rights of a Party; (b) any Dispute related to, or arising from,
              allegations of theft, piracy, invasion of privacy, or unauthorized
              use; and (c) any claim for injunctive relief. If this provision is
              found to be illegal or unenforceable, then neither Party will
              elect to arbitrate any Dispute falling within that portion of this
              provision found to be illegal or unenforceable and such Dispute
              shall be decided by a court of competent jurisdiction within the
              courts listed for jurisdiction above, and the Parties agree to
              submit to the personal jurisdiction of that court.
            </MyParagraph>
          </>
          {/* 11 */}
          <>
            <MyHeader id="corrections" vsize={"lg"} className="text-start">
              11. Corrections
            </MyHeader>
            <MyParagraph className="text-start">
              There may be information on the Services that contains
              typographical errors, inaccuracies, or omissions, including
              descriptions, pricing, availability, and various other
              information. We reserve the right to correct any errors,
              inaccuracies, or omissions and to change or update the information
              on the Services at any time, without prior notice.
            </MyParagraph>
          </>
          {/* 12 */}
          <>
            <MyHeader id="disclaimer" vsize={"lg"} className="text-start">
              12. Disclaimer
            </MyHeader>
            <MyParagraph className="text-start">
              THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU
              AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO
              THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES,
              EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE
              THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
              NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT
              THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT OR THE
              CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE
              SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY
              (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS,
              (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER,
              RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY
              UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND
              ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED
              THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR
              FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE
              LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY
              THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND
              MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A
              RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE
              MADE AVAILABLE VIA THE SERVICES. WE DO NOT WARRANT, ENDORSE,
              GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE
              ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY
              HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED
              IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO
              OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION
              BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.
              AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR
              IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE
              CAUTION WHERE APPROPRIATE.
            </MyParagraph>
          </>
          {/* 13 */}
          <>
            <MyHeader id="limitations" vsize={"lg"} className="text-start">
              13. Limitations of liability
            </MyHeader>
            <MyParagraph className="text-start">
              IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE
              LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT,
              CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE
              DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR
              OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE
              HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR
              LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE
              FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE LESSER OF
              THE AMOUNT PAID, IF ANY, BY YOU TO US OR. CERTAIN US STATE LAWS
              AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED
              WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF
              THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR
              LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL
              RIGHTS.
            </MyParagraph>
          </>
          {/* 14 */}
          <>
            <MyHeader id="indemnification" vsize={"lg"} className="text-start">
              14. Indemnification
            </MyHeader>
            <MyParagraph className="text-start">
              You agree to defend, indemnify, and hold us harmless, including
              our subsidiaries, affiliates, and all of our respective officers,
              agents, partners, and employees, from and against any loss,
              damage, liability, claim, or demand, including reasonable
              attorneys' fees and expenses, made by any third party due to or
              arising out of: (1) use of the Services; (2) breach of these Legal
              Terms; (3) any breach of your representations and warranties set
              forth in these Legal Terms; (4) your violation of the rights of a
              third party, including but not limited to intellectual property
              rights; or (5) any overt harmful act toward any other user of the
              Services with whom you connected via the Services. Notwithstanding
              the foregoing, we reserve the right, at your expense, to assume
              the exclusive defense and control of any matter for which you are
              required to indemnify us, and you agree to cooperate, at your
              expense, with our defense of such claims. We will use reasonable
              efforts to notify you of any such claim, action, or proceeding
              which is subject to this indemnification upon becoming aware of
              it.
            </MyParagraph>
          </>
          {/* 15 */}
          <>
            <MyHeader id="userData" vsize={"lg"} className="text-start">
              15. User data
            </MyHeader>
            <MyParagraph className="text-start">
              We will maintain certain data that you transmit to the Services
              for the purpose of managing the performance of the Services, as
              well as data relating to your use of the Services. Although we
              perform regular routine backups of data, you are solely
              responsible for all data that you transmit or that relates to any
              activity you have undertaken using the Services. You agree that we
              shall have no liability to you for any loss or corruption of any
              such data, and you hereby waive any right of action against us
              arising from any such loss or corruption of such data.
            </MyParagraph>
          </>
          {/* 16 */}
          <>
            <MyHeader id="transactions" vsize={"lg"} className="text-start">
              16. Electronic communications, transactions, and signatures
            </MyHeader>
            <MyParagraph className="text-start">
              Visiting the Services, sending us emails, and completing online
              forms constitute electronic communications. You consent to receive
              electronic communications, and you agree that all agreements,
              notices, disclosures, and other communications we provide to you
              electronically, via email and on the Services, satisfy any legal
              requirement that such communication be in writing. YOU HEREBY
              AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND
              OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES,
              AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA
              THE SERVICES. You hereby waive any rights or requirements under
              any statutes, regulations, rules, ordinances, or other laws in any
              jurisdiction which require an original signature or delivery or
              retention of non-electronic records, or to payments or the
              granting of credits by any means other than electronic means.
            </MyParagraph>
          </>
          {/* 17 */}
          <>
            <MyHeader id="miscellaneous" vsize={"lg"} className="text-start">
              17. Miscellaneous
            </MyHeader>
            <MyParagraph className="text-start">
              These Legal Terms and any policies or operating rules posted by us
              on the Services or in respect to the Services constitute the
              entire agreement and understanding between you and us. Our failure
              to exercise or enforce any right or provision of these Legal Terms
              shall not operate as a waiver of such right or provision. These
              Legal Terms operate to the fullest extent permissible by law. We
              may assign any or all of our rights and obligations to others at
              any time. We shall not be responsible or liable for any loss,
              damage, delay, or failure to act caused by any cause beyond our
              reasonable control. If any provision or part of a provision of
              these Legal Terms is determined to be unlawful, void, or
              unenforceable, that provision or part of the provision is deemed
              severable from these Legal Terms and does not affect the validity
              and enforceability of any remaining provisions. There is no joint
              venture, partnership, employment or agency relationship created
              between you and us as a result of these Legal Terms or use of the
              Services. You agree that these Legal Terms will not be construed
              against us by virtue of having drafted them. You hereby waive any
              and all defenses you may have based on the electronic form of
              these Legal Terms and the lack of signing by the parties hereto to
              execute these Legal Terms.
            </MyParagraph>
          </>
          {/* 18 */}
          <>
            <MyHeader id="contacts" vsize={"lg"} className="text-start">
              18. Contact us
            </MyHeader>
            <MyParagraph className="text-start">
              In order to resolve a complaint regarding the Services or to
              receive further information regarding use of the Services, please
              contact us at: tarolv3@gmail.com
            </MyParagraph>
          </>
        </MyBlock>
      </MyContainer>
    </main>
  );
});

export default TermsPage;
