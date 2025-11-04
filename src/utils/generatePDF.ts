import { calculateTotalCost, GUEST_COST, PARTICIPANT_COST } from "@/constants/pricing";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ParticipantData {
    name: string;
    mobile: string;
    email: string;
    sscBatch: string;
    countryCode: string;
}

interface Guest {
    id: string;
    name: string;
    relationship: string;
}

interface PDFData {
    participant: ParticipantData;
    guests: Guest[];
    totalCost: number;
    registrationId?: number;
    paymentId?: string;
}

function escapeHtml(text: string): string {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

async function loadFont(): Promise<void> {
    return new Promise((resolve) => {
        if (document.fonts && document.fonts.check("16px 'Noto Sans Bengali'")) {
            resolve();
            return;
        }

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
            "https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap";
        document.head.appendChild(link);

        if (document.fonts) {
            document.fonts.ready.then(() => {
                setTimeout(resolve, 1000);
            });
        } else {
            setTimeout(resolve, 1500);
        }
    });
}

export async function generateRegistrationPDF(data: PDFData): Promise<void> {
    await loadFont();

    const participantCost = PARTICIPANT_COST;
    const guestCost = GUEST_COST;
    const totalAmount = calculateTotalCost(data.guests.length);

    const date = new Date().toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "-9999px";
    container.style.left = "0";
    container.style.width = "794px";
    container.style.padding = "28px";
    container.style.backgroundColor = "#ffffff";
    container.style.color = "#1E293B";
    container.style.fontFamily = "'Noto Sans Bengali', Arial, sans-serif";
    container.style.boxSizing = "border-box";
    container.style.visibility = "visible";

    container.innerHTML = `
    <div style="text-align: center; margin-bottom: 30px;">
    <div style="display: flex; justify-content: center; margin-bottom: 20px;">
        <img src="/images/logo.svg" alt="Logo" style="width: 100px; height: 100px; display: block;" crossorigin="anonymous" />
      </div>
      <div style="height: 4px; background: #007BFF; width: 100%; margin-bottom: 20px;"></div>      
      <div style="font-size: 28px; font-weight: 700; color: #007BFF; margin-bottom: 8px;">নিবন্ধন নিশ্চিতকরণ</div>
      <div style="font-size: 12px; color: #64748B; margin-bottom: 30px;">তারিখ: ${escapeHtml(date)}</div>
    </div>

    <div style="background: #F8FAFC; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
      <div style="font-size: 18px; font-weight: 600; color: #1E293B; margin-bottom: 16px;">অংশগ্রহণকারীর তথ্য</div>
      <div style="font-size: 13px; color: #475569; margin-bottom: 10px; line-height: 1.6;">
        <span style="font-weight: 600; color: #334155;">নাম:</span> ${escapeHtml(data.participant.name)}
      </div>
      <div style="font-size: 13px; color: #475569; margin-bottom: 10px; line-height: 1.6;">
        <span style="font-weight: 600; color: #334155;">মোবাইল:</span> ${escapeHtml(data.participant.mobile)}
      </div>
      ${data.participant.email
            ? `<div style="font-size: 13px; color: #475569; margin-bottom: 10px; line-height: 1.6;">
        <span style="font-weight: 600; color: #334155;">ইমেইল:</span> ${escapeHtml(data.participant.email)}
      </div>`
            : ""
        }
      <div style="font-size: 13px; color: #475569; margin-bottom: 10px; line-height: 1.6;">
        <span style="font-weight: 600; color: #334155;">এসএসসি ব্যাচ:</span> ${escapeHtml(data.participant.sscBatch)}
      </div>
    </div>

    <div style="background: #F8FAFC; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
      <div style="font-size: 18px; font-weight: 600; color: #1E293B; margin-bottom: 16px;">অতিথি</div>
      ${data.guests.length > 0
            ? data.guests
                .map(
                    (guest, index) =>
                        `<div style="font-size: 13px; color: #475569; margin-bottom: 8px; line-height: 1.6;">${index + 1}. ${escapeHtml(guest.name)} (${escapeHtml(guest.relationship)})</div>`
                )
                .join("")
            : `<div style="font-size: 13px; color: #475569; line-height: 1.6;">কোন অতিথি যোগ করা হয়নি</div>`
        }
    </div>

    <div style="background: #007BFF; border-radius: 8px; padding: 20px; margin-top: 20px;">
      <div style="font-size: 18px; font-weight: 600; color: #FFFFFF; margin-bottom: 16px;">পেমেন্ট তথ্য</div>
      <div style="font-size: 17px; font-weight: 500; color: #FFFFFF; margin-bottom: 16px;">
      অনুগ্রহপূর্বক নিচের বিকাশ নম্বরে পেমেন্ট সম্পন্ন করুন: <br />
        📱 ০১৩১৩৩৪৯৮২৬
        <br />
        পেমেন্ট সম্পন্ন করার জন‍্য নিবন্ধন নম্বর বিকাশের রেফারেন্স এর ঘরে দেয়ার অনুরোধ থাকলো । আর পেমেন্ট করার পর পেমেন্ট এর কনফার্মেশন মেসেজ রেজিস্ট্রেশন উপ-কমিটির কাছে পাঠানোর অনুরোধ রইল। <br />
        <br />
        ‘শতবার্ষিকী উদযাপন রেজিস্ট্রেশন উপ-কমিটি’
        <br />
        •	আহ্বায়ক: এস. এম. আব্দুর রউফ — ☎ ০১৭১৩৩১৬৭৫৪৭
        <br />
        •	সদস্য সচিব: আশরাফ হোসেন কিরণ — ☎ ০১৮৩১৯৮৭৯২২
      </div>
      <br />
      <div style="font-size: 13px; color: #FFFFFF; margin-bottom: 8px; line-height: 1.6;">
        <span style="font-weight: 600;">অংশগ্রহণকারী:</span> ${participantCost} BDT
      </div>
      ${data.guests.length > 0
            ? `<div style="font-size: 13px; color: #FFFFFF; margin-bottom: 8px; line-height: 1.6;">
        <span style="font-weight: 600;">অতিথি (${data.guests.length} জন):</span> ${data.guests.length * guestCost} BDT
      </div>`
            : ""
        }
      <div style="font-size: 16px; font-weight: 700; color: #FFFFFF; margin-top: 8px;">মোট: ${totalAmount} BDT</div>
      <div style="font-size: 13px; color: #FFD700; margin-top: 12px; font-weight: 600;">স্ট্যাটাস: অপরিশোধিত (Unpaid)</div>
      ${data.registrationId
            ? `<div style="font-size: 13px; color: #FFFFFF; margin-top: 12px; line-height: 1.6;">
        <span style="font-weight: 600;">নিবন্ধন আইডি:</span> ${escapeHtml(data.registrationId.toString())}
      </div>`
            : ""
        }
      ${data.paymentId
            ? `<div style="font-size: 13px; color: #FFFFFF; margin-top: 8px; line-height: 1.6;">
        <span style="font-weight: 600;">পেমেন্ট আইডি:</span> ${escapeHtml(data.paymentId)}
      </div>`
            : ""
        }
    </div>
  `;

    document.body.appendChild(container);

    const logoImg = container.querySelector("img") as HTMLImageElement;
    if (logoImg) {
        logoImg.src = "/images/logo.svg";
        logoImg.onload = () => {
            console.log("Logo loaded successfully");
        };
        logoImg.onerror = () => {
            console.error("Logo failed to load");
        };
        await new Promise<void>((resolve) => {
            if (logoImg.complete && logoImg.naturalHeight !== 0) {
                resolve();
                return;
            }
            logoImg.onload = () => resolve();
            logoImg.onerror = () => resolve();
            setTimeout(() => resolve(), 3000);
        });
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
        const canvas = await html2canvas(container, {
            scale: 2,
            useCORS: true,
            logging: true,
            backgroundColor: "#ffffff",
            allowTaint: false,
            foreignObjectRendering: false,
            imageTimeout: 5000,
            removeContainer: false,
            width: container.scrollWidth,
            height: container.scrollHeight,
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = imgWidth / imgHeight;

        let finalWidth = pdfWidth - 20;
        let finalHeight = finalWidth / ratio;

        if (finalHeight > pdfHeight - 20) {
            finalHeight = pdfHeight - 20;
            finalWidth = finalHeight * ratio;
        }

        pdf.addImage(imgData, "PNG", 10, 10, finalWidth, finalHeight);
        pdf.save("reunion-registration-confirmation.pdf");
    } catch (error) {
        console.error("Error generating PDF:", error);
        throw error;
    } finally {
        if (document.body.contains(container)) {
            document.body.removeChild(container);
        }
    }
}
