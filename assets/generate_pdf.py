"""
Generate platform-overview.pdf for VidGo Technology
Functional presentation — no specific technology names.
Brand colors: blue #3945E6, orange #FF8B32
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, white, black, Color
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether, ListFlowable, ListItem, HRFlowable
)
from reportlab.pdfgen import canvas
from reportlab.platypus.doctemplate import PageTemplate, BaseDocTemplate, Frame
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# Brand colors
BLUE = HexColor("#3945E6")
BLUE_DARK = HexColor("#0F1A8E")
BLUE_LIGHT = HexColor("#4A5DE0")
ORANGE = HexColor("#FF8B32")
ORANGE_DEEP = HexColor("#E66B14")
INK = HexColor("#0E1220")
INK2 = HexColor("#2A2F4A")
MUTED = HexColor("#5a5c78")
BG = HexColor("#F4F1EA")
CARD = HexColor("#ffffff")
BORDER = HexColor("#e6e3da")
WHITE = white

W, H = A4  # 595 x 842

OUTPUT = os.path.join(os.path.dirname(__file__), "platform-overview.pdf")
PHOTO = os.path.join(os.path.dirname(__file__), "ioana-web.jpg")


def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16)/255.0 for i in (0, 2, 4))


class PlatformOverviewPDF:
    def __init__(self):
        self.c = canvas.Canvas(OUTPUT, pagesize=A4)
        self.c.setTitle("VidGo Technology — Platform Overview")
        self.c.setAuthor("Ioana Dinu")
        self.c.setSubject("Platform Overview — Functional Presentation")
        self.page_num = 0
        self.total_pages = 12

    def _gradient_rect(self, x, y, w, h, color1, color2, steps=120):
        """Draw a vertical gradient rectangle."""
        r1, g1, b1 = hex_to_rgb(color1)
        r2, g2, b2 = hex_to_rgb(color2)
        step_h = h / steps
        for i in range(steps):
            t = i / steps
            r = r1 + (r2 - r1) * t
            g = g1 + (g2 - g1) * t
            b = b1 + (b2 - b1) * t
            self.c.setFillColorRGB(r, g, b)
            self.c.rect(x, y + h - (i + 1) * step_h, w, step_h + 1, fill=1, stroke=0)

    def _diagonal_gradient(self, x, y, w, h, color1, color2, steps=200):
        """Draw a diagonal gradient (top-left to bottom-right)."""
        r1, g1, b1 = hex_to_rgb(color1)
        r2, g2, b2 = hex_to_rgb(color2)
        step_h = h / steps
        for i in range(steps):
            t = i / steps
            r = r1 + (r2 - r1) * t
            g = g1 + (g2 - g1) * t
            b = b1 + (b2 - b1) * t
            self.c.setFillColorRGB(r, g, b)
            self.c.rect(x, y + h - (i + 1) * step_h, w, step_h + 1, fill=1, stroke=0)

    def _page_header(self, title=None):
        """Standard content page header with logo mark and page number."""
        self.page_num += 1
        # Top bar
        self.c.setFillColor(BLUE)
        self.c.setFont("Helvetica-Bold", 8)
        self.c.drawString(40, H - 30, ">>>")
        self.c.setFillColor(INK2)
        self.c.setFont("Helvetica", 8)
        self.c.drawString(60, H - 30, f"VidGo Technology — Platform Overview")
        self.c.drawRightString(W - 40, H - 30, f"{self.page_num} / {self.total_pages}")
        # Thin line
        self.c.setStrokeColor(BORDER)
        self.c.setLineWidth(0.5)
        self.c.line(40, H - 38, W - 40, H - 38)

    def _section_title(self, text, y):
        """Draw a section title with orange underline."""
        self.c.setFillColor(BLUE_DARK)
        self.c.setFont("Helvetica-Bold", 16)
        self.c.drawString(40, y, text)
        # Orange accent bar
        self.c.setStrokeColor(ORANGE)
        self.c.setLineWidth(3)
        tw = self.c.stringWidth(text, "Helvetica-Bold", 16)
        bar_w = min(tw * 0.4, 60)
        self.c.line(40, y - 6, 40 + bar_w, y - 6)
        return y - 30

    def _sub_heading(self, text, y):
        self.c.setFillColor(INK)
        self.c.setFont("Helvetica-Bold", 11.5)
        self.c.drawString(40, y, text)
        return y - 18

    def _body_text(self, text, y, x=40, max_w=None, font_size=9.5, leading=14, color=INK2):
        """Draw wrapped body text. Returns new y."""
        if max_w is None:
            max_w = W - 80
        self.c.setFillColor(color)
        self.c.setFont("Helvetica", font_size)
        words = text.split()
        line = ""
        for word in words:
            test = line + (" " if line else "") + word
            if self.c.stringWidth(test, "Helvetica", font_size) > max_w:
                self.c.drawString(x, y, line)
                y -= leading
                line = word
            else:
                line = test
        if line:
            self.c.drawString(x, y, line)
            y -= leading
        return y

    def _bullet(self, text, y, x=52, bullet_x=42, max_w=None, font_size=9.5, leading=13.5):
        """Draw a bullet point with wrapped text."""
        if max_w is None:
            max_w = W - 80 - (x - 40)
        self.c.setFillColor(ORANGE)
        self.c.setFont("Helvetica", font_size)
        self.c.drawString(bullet_x, y, "•")
        self.c.setFillColor(INK2)
        words = text.split()
        line = ""
        first = True
        for word in words:
            test = line + (" " if line else "") + word
            if self.c.stringWidth(test, "Helvetica", font_size) > max_w:
                self.c.drawString(x, y, line)
                y -= leading
                line = word
                first = False
            else:
                line = test
        if line:
            self.c.drawString(x, y, line)
            y -= leading
        return y

    def _sub_bullet(self, text, y, x=68, bullet_x=58):
        """Draw a sub-bullet (circle)."""
        max_w = W - 80 - (x - 40)
        self.c.setFillColor(BLUE_LIGHT)
        self.c.setFont("Helvetica", 9)
        self.c.drawString(bullet_x, y, "◦")
        self.c.setFillColor(INK2)
        self.c.setFont("Helvetica", 9)
        words = text.split()
        line = ""
        for word in words:
            test = line + (" " if line else "") + word
            if self.c.stringWidth(test, "Helvetica", 9) > max_w:
                self.c.drawString(x, y, line)
                y -= 13
                line = word
            else:
                line = test
        if line:
            self.c.drawString(x, y, line)
            y -= 13
        return y

    def _table(self, data, y, col_widths=None):
        """Draw a simple table."""
        if col_widths is None:
            col_widths = [200, W - 120 - 200]
        num_rows = len(data)

        row_height = 28
        header_h = 28
        x = 40
        total_w = sum(col_widths)

        # Header row
        self.c.setFillColor(BLUE_DARK)
        self.c.rect(x, y - header_h, total_w, header_h, fill=1, stroke=0)
        self.c.setFillColor(WHITE)
        self.c.setFont("Helvetica-Bold", 8.5)
        cx = x + 10
        for i, header in enumerate(data[0]):
            self.c.drawString(cx, y - 18, header)
            cx += col_widths[i]

        # Data rows
        curr_y = y - header_h
        for row_idx in range(1, num_rows):
            row = data[row_idx]
            # Alternate bg
            if row_idx % 2 == 0:
                self.c.setFillColor(HexColor("#F8F6F0"))
            else:
                self.c.setFillColor(WHITE)
            self.c.rect(x, curr_y - row_height, total_w, row_height, fill=1, stroke=0)
            # Border bottom
            self.c.setStrokeColor(BORDER)
            self.c.setLineWidth(0.3)
            self.c.line(x, curr_y - row_height, x + total_w, curr_y - row_height)

            cx = x + 10
            for i, cell in enumerate(row):
                if i == 0:
                    self.c.setFillColor(INK)
                    self.c.setFont("Helvetica-Bold", 9)
                else:
                    self.c.setFillColor(INK2)
                    self.c.setFont("Helvetica", 9)
                # Truncate or wrap
                max_cell_w = col_widths[i] - 20
                display = cell
                while self.c.stringWidth(display, self.c._fontname, self.c._fontsize) > max_cell_w and len(display) > 3:
                    display = display[:-1]
                self.c.drawString(cx, curr_y - 18, display)
                cx += col_widths[i]
            curr_y -= row_height

        return curr_y - 5

    def _table_multiline(self, data, y, col_widths=None):
        """Draw a table where cells can wrap to multiple lines."""
        if col_widths is None:
            col_widths = [200, W - 120 - 200]
        x = 40
        total_w = sum(col_widths)
        header_h = 28

        # Header
        self.c.setFillColor(BLUE_DARK)
        self.c.rect(x, y - header_h, total_w, header_h, fill=1, stroke=0)
        self.c.setFillColor(WHITE)
        self.c.setFont("Helvetica-Bold", 8.5)
        cx = x + 10
        for i, header in enumerate(data[0]):
            self.c.drawString(cx, y - 18, header)
            cx += col_widths[i]

        curr_y = y - header_h
        for row_idx in range(1, len(data)):
            row = data[row_idx]
            # Calculate row height based on text wrapping
            max_lines = 1
            for i, cell in enumerate(row):
                cell_w = col_widths[i] - 20
                font_name = "Helvetica-Bold" if i == 0 else "Helvetica"
                words = cell.split()
                line = ""
                lines = 1
                for word in words:
                    test = line + (" " if line else "") + word
                    if pdfmetrics.stringWidth(test, font_name, 9) > cell_w:
                        lines += 1
                        line = word
                    else:
                        line = test
                max_lines = max(max_lines, lines)
            row_height = max(28, 14 + max_lines * 13)

            if row_idx % 2 == 0:
                self.c.setFillColor(HexColor("#F8F6F0"))
            else:
                self.c.setFillColor(WHITE)
            self.c.rect(x, curr_y - row_height, total_w, row_height, fill=1, stroke=0)
            self.c.setStrokeColor(BORDER)
            self.c.setLineWidth(0.3)
            self.c.line(x, curr_y - row_height, x + total_w, curr_y - row_height)

            cx = x + 10
            for i, cell in enumerate(row):
                if i == 0:
                    self.c.setFillColor(INK)
                    self.c.setFont("Helvetica-Bold", 9)
                    font_name = "Helvetica-Bold"
                else:
                    self.c.setFillColor(INK2)
                    self.c.setFont("Helvetica", 9)
                    font_name = "Helvetica"
                cell_w = col_widths[i] - 20
                text_y = curr_y - 16
                words = cell.split()
                line = ""
                for word in words:
                    test = line + (" " if line else "") + word
                    if pdfmetrics.stringWidth(test, font_name, 9) > cell_w:
                        self.c.drawString(cx, text_y, line)
                        text_y -= 13
                        line = word
                    else:
                        line = test
                if line:
                    self.c.drawString(cx, text_y, line)
                cx += col_widths[i]
            curr_y -= row_height
        return curr_y - 5

    def _callout_box(self, text, y, bold_title=None):
        """Draw a callout box with left border accent."""
        x = 40
        box_w = W - 80
        # Estimate height
        lines = 1
        words = text.split()
        line = ""
        for word in words:
            test = line + (" " if line else "") + word
            if pdfmetrics.stringWidth(test, "Helvetica", 9.5) > box_w - 30:
                lines += 1
                line = word
            else:
                line = test
        box_h = max(40, 20 + lines * 14 + (18 if bold_title else 0))

        # Background
        self.c.setFillColor(HexColor("#FAFAF5"))
        self.c.roundRect(x, y - box_h, box_w, box_h, 4, fill=1, stroke=0)
        # Left accent
        self.c.setFillColor(BLUE_LIGHT)
        self.c.rect(x, y - box_h, 3, box_h, fill=1, stroke=0)

        text_y = y - 18
        if bold_title:
            self.c.setFillColor(BLUE)
            self.c.setFont("Helvetica-Bold", 10)
            self.c.drawString(x + 14, text_y, bold_title)
            text_y -= 16

        self.c.setFillColor(INK2)
        self.c.setFont("Helvetica", 9.5)
        wds = text.split()
        ln = ""
        for word in wds:
            test = ln + (" " if ln else "") + word
            if pdfmetrics.stringWidth(test, "Helvetica", 9.5) > box_w - 30:
                self.c.drawString(x + 14, text_y, ln)
                text_y -= 14
                ln = word
            else:
                ln = test
        if ln:
            self.c.drawString(x + 14, text_y, ln)
            text_y -= 14
        return y - box_h - 10

    # ================================================================
    # PAGE 1: COVER
    # ================================================================
    def page_cover(self):
        self.page_num += 1
        # Full-page gradient: dark blue -> orange (diagonal feel via multi-stop)
        self._diagonal_gradient(0, 0, W, H, "#0A1060", "#3945E6", steps=100)
        # Add warm orange glow in bottom portion
        for i in range(80):
            t = i / 80
            alpha = t * 0.7
            r = 0.106 + (1.0 - 0.106) * t
            g = 0.169 + (0.549 - 0.169) * t
            b = 0.761 + (0.165 - 0.761) * t
            self.c.setFillColorRGB(r, g, b, alpha)
            strip_h = H * 0.5 / 80
            self.c.rect(0, i * strip_h, W, strip_h + 1, fill=1, stroke=0)

        # Logo mark
        self.c.setFillColor(HexColor("#6BE0F0"))
        self.c.setFont("Helvetica-Bold", 14)
        self.c.drawString(55, H - 100, ">>>")
        self.c.setFillColor(WHITE)
        self.c.setFont("Helvetica-Bold", 28)
        self.c.drawString(95, H - 102, "VIDGO TECHNOLOGY")

        # Tagline
        self.c.setFillColor(ORANGE)
        self.c.setFont("Helvetica", 10)
        self.c.drawString(55, H - 128, "E - C O M M E R C E   T E C H N O L O G Y   I N   M O T I O N")

        # Main title
        self.c.setFillColor(WHITE)
        self.c.setFont("Helvetica-Bold", 52)
        self.c.drawString(55, H - 360, "PLATFORM")
        self.c.drawString(55, H - 420, "OVERVIEW")

        # Subtitle
        self.c.setFillColor(HexColor("#C8CCEE"))
        self.c.setFont("Helvetica", 13)
        y = H - 470
        y = self._body_text(
            "A production-ready e-commerce backend, storefront, and admin panel — designed as a foundation for custom-code projects, not as another SaaS rental.",
            y, x=55, max_w=420, font_size=13, leading=19, color=WHITE
        )

        # Bottom status bar
        bar_y = 65
        # Status
        self.c.setFillColor(ORANGE)
        self.c.setFont("Helvetica-Bold", 8)
        self.c.drawString(55, bar_y + 16, "STATUS")
        self.c.setFillColor(WHITE)
        self.c.setFont("Helvetica", 11)
        self.c.drawString(55, bar_y, "Production-ready core")

        # Launch pill
        self.c.setFillColor(ORANGE)
        self.c.roundRect(220, bar_y - 4, 220, 22, 11, fill=1, stroke=0)
        self.c.setFillColor(WHITE)
        self.c.setFont("Helvetica-Bold", 9.5)
        self.c.drawCentredString(330, bar_y + 2, "First merchant launch · May 2026")

        # Document version
        self.c.setFillColor(ORANGE)
        self.c.setFont("Helvetica-Bold", 8)
        self.c.drawRightString(W - 55, bar_y + 16, "DOCUMENT")
        self.c.setFillColor(WHITE)
        self.c.setFont("Helvetica", 11)
        self.c.drawRightString(W - 55, bar_y, "v2 · May 2026")

        self.c.showPage()

    # ================================================================
    # PAGE 2: STATUS + WHAT IT IS + STOREFRONT (Browse, Cart)
    # ================================================================
    def page_2(self):
        self._page_header()
        y = H - 60

        # Status callout
        y = self._callout_box(
            "Production-ready core. First merchant launch scheduled mid-to-late May 2026. End-to-end QA in progress on real fiscal, payment, and refund flows. The platform ships with infrastructure most ecommerce builds bolt on later — broadcast email engine, incident notification system, fuzzy CSV import, idempotent refund pipeline, audit trails, encrypted token storage.",
            y, bold_title="STATUS"
        )
        y -= 5

        # WHAT IT IS
        y = self._section_title("WHAT IT IS", y)
        y = self._body_text(
            "A complete e-commerce backend + storefront + admin panel a merchant can run on their own infrastructure. No per-transaction platform fee, no SaaS subscription, no app-store tax. The code base is owned by the merchant (or licensed); operating cost is hosting + payment processing fees + email-sending only.",
            y
        )
        y -= 4
        y = self._body_text(
            "Locale-agnostic core, EU-style fiscal compliance built in (configurable per shop). All user-facing content — pages, emails, error messages — lives as editable templates. Translation to any market is a content task, not an engineering one.",
            y
        )
        y -= 12

        # CUSTOMER-FACING STOREFRONT
        y = self._section_title("CUSTOMER-FACING STOREFRONT", y)

        y = self._sub_heading("Browse & discover", y)
        bullets = [
            "Product catalog with category hierarchy (multi-level), producer/brand filtering, full-text search, on-sale highlights",
            "SEO-friendly URLs with category landing pages (configurable URL prefix per locale) and per-product slugs",
            "Per-category and per-product meta tags (title, description, keywords) — SEO data preserved on import from existing platforms",
            "AI SEO evaluation for product titles, descriptions, metadata, LLM readability, and AI crawler discoverability before publish",
            "Mobile-first responsive storefront",
            "Recently-viewed products tracking",
            "Wishlist (persisted across sessions for logged-in users)",
        ]
        for b in bullets:
            y = self._bullet(b, y)
        y -= 8

        y = self._sub_heading("Cart & checkout", y)
        bullets2 = [
            "Logged-in cart + guest cart, persisted across sessions",
            "Voucher codes applied at cart with live recalculation",
            "Automated abandoned cart and checkout recovery emails",
            "Multiple payment methods in one flow:",
        ]
        for b in bullets2:
            y = self._bullet(b, y)
        sub_bullets = [
            "Stripe Checkout (cards, Apple Pay, Google Pay)",
            "Bank Transfer with proforma invoice (PDF with due date) emailed automatically",
            "Cash on Delivery with admin manual confirmation",
        ]
        for sb in sub_bullets:
            y = self._sub_bullet(sb, y)

        self.c.showPage()

    # ================================================================
    # PAGE 3: STOREFRONT continued (Account, Compliance) + ADMIN (Catalog)
    # ================================================================
    def page_3(self):
        self._page_header()
        y = H - 60

        bullets = [
            "Shipping cost calculation (per-zone, weight-based)",
            "Address management (multiple saved addresses, separate billing/delivery)",
            "T&C and GDPR consent enforcement (frontend + backend defense in depth)",
        ]
        for b in bullets:
            y = self._bullet(b, y)
        y -= 8

        y = self._sub_heading("Account & post-purchase", y)
        bullets2 = [
            "Self-service registration with email confirmation",
            "Forgot-password flow with rate-limited reset links (24h expiry)",
            "Order history with full status tracking (PLACED -> CONFIRMED -> PACKING -> SHIPPED -> DELIVERED)",
            "Public invoice download (anyone-with-link, audit-logged, rate-limited, status-aware expiry)",
            "Self-service refund requests with item-level granularity (full or partial)",
            "Storno (credit note) auto-generated and emailed on refund approval",
            "Newsletter subscribe/unsubscribe (one-click via signed token in email)",
            "GDPR account anonymization (Article 17 compliant, audit-logged) — purges PII while preserving fiscal records to satisfy retention requirements (configurable retention window per jurisdiction)",
        ]
        for b in bullets2:
            y = self._bullet(b, y)
        y -= 8

        y = self._sub_heading("Compliance & legal", y)
        bullets3 = [
            "Cookie consent (functional cookies only by default)",
            "Configurable Privacy / Terms / Returns / Cookies pages — content lives in editable templates, translatable to any market",
            "Failed-payment recovery emails before configurable order auto-cancel",
            "Configurable return window (default 14 days, EU consumer-rights baseline)",
        ]
        for b in bullets3:
            y = self._bullet(b, y)
        y -= 14

        # ADMIN PANEL
        y = self._section_title("ADMIN PANEL", y)

        y = self._sub_heading("Catalog management", y)
        bullets4 = [
            "Product CRUD with multi-photo upload (cloud-hosted, CDN-served)",
            "Bulk CSV import for products / categories / producers with fuzzy entity matching (auto-corrects mistyped category/producer names; flags unmatched rows for admin review)",
            "CSV export for backup or off-platform analysis",
            "Category tree management with parent-child links, drag-friendly bulk operations",
            "Producer / brand management with linked product lists",
        ]
        for b in bullets4:
            y = self._bullet(b, y)

        self.c.showPage()

    # ================================================================
    # PAGE 4: ADMIN continued (SEO, Orders, Refund, Marketing, Branding)
    # ================================================================
    def page_4(self):
        self._page_header()
        y = H - 60

        bullets = [
            "Per-product SEO fields (meta title, description, keywords) with live AI evaluation panel for search display, LLM readability, and AI crawler discoverability",
            "Discount-exempt category flag (for items that shouldn't participate in cart-level promotions)",
        ]
        for b in bullets:
            y = self._bullet(b, y)
        y -= 8

        y = self._sub_heading("Order operations", y)
        bullets2 = [
            "Full order lifecycle dashboard with tab-based filtering by status",
            "Order details with line items, customer info, payment timeline",
            "Status transitions enforced by validator (no illegal state changes)",
            "Manual edits to order contents pre-shipment (add/remove/change quantity)",
            "Tracking URL attachment on SHIPPED status",
            "Email notifications fire automatically per status change (CONFIRMED, PACKING, SHIPPED, DELIVERED, refund states)",
        ]
        for b in bullets2:
            y = self._bullet(b, y)
        y -= 8

        y = self._sub_heading("Refund & storno", y)
        bullets3 = [
            "Per-item refund granularity (full or partial)",
            "Online payment refunds processed automatically — idempotent, webhook-driven completion",
            "Bank Transfer / COD refunds tracked manually with full audit trail",
            "Storno (credit note) PDF auto-generated on refund — separate fiscal document with line items, discount distribution per line, sign convention reconciles cleanly against the original invoice",
            "Shipping policy: shipping NOT refunded post-delivery (EU consumer-law standard for return-after-receipt); IS refunded for pre-shipment cancellations",
            "Public storno download link emailed to customer (same audit pattern as invoices)",
        ]
        for b in bullets3:
            y = self._bullet(b, y)
        y -= 8

        y = self._sub_heading("Marketing & promotions", y)
        bullets4 = [
            "Voucher codes (manual code input by customer at cart)",
            "Discount rules (auto-applied based on conditions: min order, category-specific, percentage or fixed amount)",
            "Per-user voucher limits (e.g., one-use welcome voucher with 5% off)",
            "Email broadcast campaigns plus cart, checkout, and failed-payment recovery flows, all by email",
            "Discount/sale notifications for wishlist items dropping in price (opt-in)",
        ]
        for b in bullets4:
            y = self._bullet(b, y)
        y -= 8

        y = self._sub_heading("Storefront branding", y)
        bullets5 = [
            "Logo, header banner, footer banner, page background — all upload/replace/delete from admin",
            "Currency selector (EUR/RON/USD/GBP)",
            "Configurable return-days policy",
        ]
        for b in bullets5:
            y = self._bullet(b, y)

        self.c.showPage()

    # ================================================================
    # PAGE 5: ADMIN continued (Vacation, Stock, Support, Reporting)
    # ================================================================
    def page_5(self):
        self._page_header()
        y = H - 60

        bullets = [
            "Vacation mode (with custom message displayed to customers)",
            "Stock-management toggle (production deploy currently runs without stock — admin manually confirms each order to avoid oversell)",
        ]
        for b in bullets:
            y = self._bullet(b, y)
        y -= 8

        y = self._sub_heading("Customer support", y)
        bullets2 = [
            "Product feedback moderation with configurable profanity filter",
            "Customer search with full-text + filter combinators",
            "Per-customer order history view",
            "Notification panel for system incidents (email failures, payment webhook anomalies, storage outages, etc.) — email alert + in-panel triage",
        ]
        for b in bullets2:
            y = self._bullet(b, y)
        y -= 8

        y = self._sub_heading("Reporting", y)
        bullets3 = [
            "Sales analytics by period",
            "Top products by volume / revenue",
            "Customer lifetime value",
            "Upload history audit trail (who imported what CSV when, with rejected/corrected subset CSVs preserved in cloud storage)",
            "Accounting CSV exports — analytics-ready data feed. One click exports order-level totals and per-product order lines for the selected period, including invoice number, order id, dates, prices, totals before/after discount, currency, payment method, buyer + seller details, IBAN, payment terms, and notes.",
        ]
        for b in bullets3:
            y = self._bullet(b, y)
        y -= 14

        # FISCAL & ACCOUNTING
        y = self._section_title("FISCAL & ACCOUNTING", y)
        bullets4 = [
            "Invoice PDF generation with EU-style fiscal-compliance fields: company registration number, tax / VAT ID, registered address, IBAN, bank name, VAT payer status, VAT rate, sequential numbering, due dates for Bank Transfer",
            "Invoices generated automatically at the right moment per payment method:",
        ]
        for b in bullets4:
            y = self._bullet(b, y)
        sub_bullets = [
            "Stripe: post-payment confirmation",
            "Bank Transfer: at admin confirmation (proforma with due date) -> marked paid when admin confirms transfer received",
            "COD: at SHIPPED status",
        ]
        for sb in sub_bullets:
            y = self._sub_bullet(sb, y)
        bullets5 = [
            "Storno (credit note) for every refund — separate document, separate numbering, linked to original invoice",
        ]
        for b in bullets5:
            y = self._bullet(b, y)

        self.c.showPage()

    # ================================================================
    # PAGE 6: FISCAL continued + ARCHITECTURE (no Stack table)
    # ================================================================
    def page_6(self):
        self._page_header()
        y = H - 60

        bullets = [
            "Configurable invoicing fields per shop (company name, tax ID, registration number, IBAN, default currency, invoice prefix, notes)",
            "Configurable VAT-payer / non-VAT-payer status and VAT rate per shop",
            "e-Factura-compatible XML generated alongside fiscal invoices for manual upload into the government portal",
            "Provider abstraction remains available for future direct integration with any e-invoicing provider",
        ]
        for b in bullets:
            y = self._bullet(b, y)
        y -= 14

        # ARCHITECTURE & ENGINEERING
        y = self._section_title("ARCHITECTURE & ENGINEERING", y)

        # Instead of the Stack table, a paragraph
        y = self._body_text(
            "The platform is built on enterprise-grade, production-tested open-source technologies. Modular architecture separates admin, storefront, and core services while shipping as a single deployable unit. The database layer uses explicit SQL (no ORM magic, no hidden queries). Caching, session management, and rate limiting run on an in-memory data store. Sensitive tokens are encrypted at rest before reaching the database. All files (product images, invoices, CSV backups, branding assets) live in cloud object storage with CDN delivery.",
            y
        )
        y -= 12

        y = self._sub_heading("Engineering decisions worth highlighting", y)
        y -= 4

        y = self._callout_box(
            "Payment webhooks, refund triggers, CSV imports (re-running doesn't duplicate), category-link uploads. Re-running any operation is safe by default.",
            y, bold_title="Idempotency everywhere that matters."
        )

        self.c.showPage()

    # ================================================================
    # PAGE 7: Engineering decisions continued
    # ================================================================
    def page_7(self):
        self._page_header()
        y = H - 60

        y = self._callout_box(
            "Compliance-grade record-keeping built in, not bolted on. Every sensitive flow — uploads, invoice access, account anonymization, system incidents — is audit-logged.",
            y, bold_title="Audit trails on every sensitive flow."
        )

        y = self._callout_box(
            "When admin uploads a CSV of products with category/producer names, the system auto-matches against existing entities (exact match), suggests close matches via fuzzy distance scoring (high-confidence — admin verifies via downloadable subset CSV pre-populated with the corrected entity names), and flags unmatched rows (admin fixes & re-imports). No silent failures, no orphan data, no manual ID lookup. Same pattern wraps category-link uploads and producer imports.",
            y, bold_title="Fuzzy entity matching on bulk imports."
        )

        y = self._callout_box(
            "Built-in SMTP integration with per-recipient delivery tracking, audience segmentation (all-active / newsletter-opted / has-orders), unsubscribe via signed token (one-click, no login required), campaign analytics, abandoned cart / checkout recovery, and failed-payment follow-ups. Most platforms hand this off to third-party email services and pay per-contact monthly — here it's built into the admin panel and costs only direct sending fees (~$0.10 / 1k emails).",
            y, bold_title="Broadcast email engine, in-house."
        )

        y = self._callout_box(
            "Server-side errors that matter (email delivery failures, payment webhook anomalies, storage outages, invoice generation failures) surface in an admin in-panel triage view and fire an alert email to the operator. No external monitoring subscription needed for the operator-grade visibility a single-tenant deploy actually uses.",
            y, bold_title="Incident notification system, built-in."
        )

        y = self._callout_box(
            "Sensitive tokens (auth tokens, password reset tokens, public invoice access tokens) are encrypted before hitting the database. A database dump on its own is not enough to compromise tokens. Session tokens use asymmetric key signing, not shared-secret hashing.",
            y, bold_title="Token encryption at rest."
        )

        y = self._callout_box(
            "A single internal event triggers all refund side-effects (storno generation, email, status transitions) regardless of whether the refund came from a payment webhook, admin manual approval, or user self-service cancellation. One implementation, one test surface.",
            y, bold_title="Event-driven refund flow."
        )

        self.c.showPage()

    # ================================================================
    # PAGE 8: Defense in depth + Migration + WHAT YOU DON'T HAVE TO BUILD
    # ================================================================
    def page_8(self):
        self._page_header()
        y = H - 60

        y = self._callout_box(
            "Backend validates every order state transition (no illegal state changes); frontend hides ineligible actions; rate limiting on login + public links; CSRF on state-changing endpoints; user-facing error messages always sanitized in the storefront's locale, with technical details kept only in logs + incident notifications.",
            y, bold_title="Defense in depth on security & UX."
        )

        y = self._callout_box(
            "Built explicitly with the assumption that merchants are coming from PrestaShop / WooCommerce / Magento. CSV import schema designed to ingest realistic exports. Silent password rehash supported for migrating users from legacy platforms (users log in with their existing passwords on day one without seeing a forced reset).",
            y, bold_title="Migration-friendly design."
        )
        y -= 10

        # WHAT YOU DON'T HAVE TO BUILD
        y = self._section_title("WHAT YOU DON'T HAVE TO BUILD (PER CLIENT)", y)
        y = self._body_text(
            "Things an agency typically pays developer-hours to bolt on per project — already in the box here:",
            y
        )
        y -= 6

        data = [
            ["CONCERN", "BUILT IN"],
            ["Email broadcast + segmentation + unsubscribe", "Built-in engine, no third-party subscription per merchant"],
            ["Cart / checkout / payment recovery", "Automated email sequences for abandoned carts, abandoned checkout, and failed payments"],
            ["Operational error visibility", "Notification panel + admin triage view + email alerts"],
            ["Bulk import without manual data cleanup", "Fuzzy matcher for category/producer names"],
            ["Idempotent payment + refund webhooks", "Event-driven pipeline, safe under re-delivery"],
            ["GDPR Article 17 (right to erasure)", "One-click anonymization, audit-logged, fiscal records preserved"],
            ["Public document download (invoice, storno)", "Signed link + audit log + rate limit + status-aware expiry"],
            ["EU-style fiscal compliance", "Tax ID / company registration / IBAN / VAT settings / sequential numbering / due dates / storno credit notes"],
            ["e-Factura manual upload", "e-Factura-compatible XML generated for accountant or merchant portal upload"],
            ["Token encryption at rest", "Encrypted before database storage"],
        ]
        y = self._table_multiline(data, y)

        self.c.showPage()

    # ================================================================
    # PAGE 9: Table continued + WHAT IT DOES NOT DO
    # ================================================================
    def page_9(self):
        self._page_header()
        y = H - 60

        data = [
            ["CONCERN", "BUILT IN"],
            ["Session + rate limit + token blacklist", "In-memory caching layer, drop-in"],
            ["Object storage with CDN", "Cloud storage wired (invoices / photos / CSVs / branding)"],
            ["CSV export + re-import roundtrip", "Schema-aligned, used in production import flows"],
            ["Accounting CSV exports", "Order-level totals plus per-product order lines — directly consumable by accountant, spreadsheet, BI, or AI-driven sales analysis"],
            ["Auto-PDF for invoices + storno", "A4-layout PDF generation built in"],
        ]
        y = self._table_multiline(data, y)
        y -= 4
        y = self._body_text(
            "The point isn't \"look how many features\" — it's that each of these is a 1–4 week build per client if done from scratch. Pre-built means your billable scope can stay on the parts the client actually asked for (branding, content, integrations, custom logic) instead of the plumbing every shop needs.",
            y
        )
        y -= 14

        # WHAT IT DOES NOT DO
        y = self._section_title("WHAT IT DOES NOT DO (YET)", y)

        # Callout box
        self.c.setFillColor(HexColor("#FAFAF5"))
        box_y = y - 280
        self.c.roundRect(40, box_y, W - 80, 280, 4, fill=1, stroke=0)
        self.c.setFillColor(BLUE_LIGHT)
        self.c.rect(40, box_y, 3, 280, fill=1, stroke=0)

        self.c.setFillColor(MUTED)
        self.c.setFont("Helvetica-Oblique", 9.5)
        self.c.drawString(54, y - 16, "Honesty section. This isn't Shopify — different choices were made.")
        y -= 36

        not_yet = [
            "Variants (size x color x capacity -> SKU per combo) — single-SKU model currently. Architectural priority for next sprint (5-7 days). Designed: master product + variant table with flexible specification attributes (universal across verticals: laptops/fashion/appliances).",
            "Multi-tenant — one shop per deploy currently. Tenant isolation refactor possible but not in scope.",
            "Marketplace (multi-seller, royalties, payouts) — out of scope; different product entirely.",
            "Subscriptions / recurring billing — recurring payment API not wired.",
            "Multi-language storefront UI — internationalization framework is configured and content lives in editable templates, but the runtime locale switcher is not wired yet (one default language ships per deploy). Adding more locales is a content task.",
            "Direct native government e-invoicing portal submission — jurisdiction-specific. For now the platform generates e-Factura-compatible XML for manual upload; provider abstraction remains in place to plug in any country's portal.",
        ]
        for item in not_yet:
            y = self._bullet(item, y, x=56, bullet_x=46, max_w=W - 120)

        self.c.showPage()

    # ================================================================
    # PAGE 10: WHERE IT FITS COMMERCIALLY
    # ================================================================
    def page_10(self):
        self._page_header()
        y = H - 60

        y = self._section_title("WHERE IT FITS COMMERCIALLY", y)

        y = self._body_text(
            "The platform was built to be deployed as a custom code project for a new merchant — not as a SaaS product. An agency or partner takes the codebase, brands and configures it for the client, and delivers a self-hosted ecommerce backend the client owns outright. Per-deploy economics, not per-seat.",
            y
        )
        y -= 10

        y = self._sub_heading("Primary use case — agency-delivered custom build for a new merchant", y)
        bullets = [
            "Greenfield ecommerce launch where the client wants their own code, not a SaaS rental",
            "Agency keeps configuration + branding + content + project-management revenue at its own rates — that's the agency's main margin",
            "Client gets a production-grade backend (catalog, payments, refunds, fiscal docs, GDPR, audit) without paying SaaS rent forever",
            "EU-fiscal-ready out of the box; localization to any market is a content task, not engineering",
        ]
        for b in bullets:
            y = self._bullet(b, y)
        y -= 8

        y = self._sub_heading("Secondary use case — migration off SaaS / aging stacks", y)
        bullets2 = [
            "Shopify merchants tired of per-transaction fees and customization walls",
            "PrestaShop 1.6/1.7, Magento 1, custom PHP / ASP.NET shops where the platform has hit its ceiling",
            "CSV import schema designed to ingest realistic exports; silent password rehash for legacy platform migrations means users keep their old passwords on day one",
        ]
        for b in bullets2:
            y = self._bullet(b, y)
        y -= 8

        y = self._sub_heading("Why it's a good base for an agency", y)
        bullets3 = [
            "One codebase, one ops surface — repeated deploys don't compound your maintenance load",
            "Modular architecture means you can carve out a service when a client genuinely needs it, without architecting for it on day one",
            "Fiscal compliance + GDPR + audit trails are already built — you don't pay developer-hours to rebuild them per client",
            "Provider abstractions mean swapping payment processors, or plugging in a country-specific accounting / e-invoicing provider, is a configuration change, not a rewrite",
        ]
        for b in bullets3:
            y = self._bullet(b, y)
        y -= 8

        y = self._sub_heading("Not the right tool for", y)
        bullets4 = [
            "Headless-only setups (this comes with a storefront)",
            "Marketplace operators (multi-seller is out of scope)",
            "Brand-new solo merchants under €50k GMV who want zero-touch hosting — Shopify Basic is cheaper to start at that scale",
        ]
        for b in bullets4:
            y = self._bullet(b, y)

        self.c.showPage()

    # ================================================================
    # PAGE 11: OPERATING COST + WHERE I AM + PRICING
    # ================================================================
    def page_11(self):
        self._page_header()
        y = H - 60

        y = self._section_title("OPERATING COST (ROUGH ORDER OF MAGNITUDE)", y)
        y = self._body_text("For a single-shop deploy:", y)
        y -= 4

        data = [
            ["LINE ITEM", "MONTHLY"],
            ["Hosting (VPS, can be a single 4GB/2vCPU box for SMB volume)", "€15–30"],
            ["Cloud storage + CDN", "€1–10"],
            ["Email sending (transactional + monthly campaign of 10k emails)", "€1–5"],
            ["Stripe fees", "per-transaction only (1.4% + €0.25 EU cards typical)"],
            ["Total infra", "~€20–50/mo + Stripe"],
        ]
        y = self._table_multiline(data, y, col_widths=[310, W - 120 - 310 + 50])
        y -= 4
        y = self._body_text(
            "Compare to Shopify Basic ($39/mo) + Shopify transaction fees (2.0% if not using Shopify Payments) + per-app subscriptions. For a merchant doing €50k+/mo GMV, the difference compounds quickly.",
            y
        )
        y -= 14

        y = self._section_title("WHERE I AM IN THE BUILD", y)

        checks = [
            ("✅", "Storefront + admin core (~95% done, polishing in progress)"),
            ("✅", "Stripe + BT + COD payment flows end-to-end"),
            ("✅", "Refund + storno (EU fiscal-grade credit notes)"),
            ("✅", "Email engine with broadcast campaigns"),
            ("✅", "GDPR compliance (anonymization, public invoice expiry, audit logs)"),
        ]
        for icon, text in checks:
            self.c.setFillColor(HexColor("#2EA043"))
            self.c.setFont("Helvetica", 10)
            self.c.drawString(42, y, icon)
            y = self._bullet(text, y, x=62, bullet_x=42)

        progress = [
            ("\U0001f504", "First-merchant launch in 2-3 weeks (~40 orders/mo baseline)"),
        ]
        for icon, text in progress:
            self.c.setFillColor(ORANGE)
            self.c.setFont("Helvetica", 9)
            self.c.drawString(42, y + 1, icon)
            y = self._bullet(text, y, x=62, bullet_x=42)

        soon = [
            ("⏳", "Post-launch: variants + per-product specs (5-7 day sprint), then second client onboarding"),
        ]
        for icon, text in soon:
            self.c.setFillColor(BLUE_LIGHT)
            self.c.setFont("Helvetica", 9)
            self.c.drawString(42, y + 1, icon)
            y = self._bullet(text, y, x=62, bullet_x=42)

        y -= 14

        y = self._section_title("PRICING NOTES & SCOPE", y)
        y = self._callout_box(
            "Each engagement is structured as initial license + recurring maintenance retainer + custom dev hours. Operational costs (hosting, email, payment processing) are always merchant-paid passthrough. Specifics shaped by scope.",
            y
        )

        self.c.showPage()

    # ================================================================
    # PAGE 12: WHAT I'M LOOKING FOR (with photo)
    # ================================================================
    def page_12(self):
        self._page_header()
        y = H - 60

        # Gradient footer area
        for i in range(120):
            t = i / 120
            r1, g1, b1 = hex_to_rgb("#3945E6")
            r2, g2, b2 = hex_to_rgb("#FF8B32")
            r = r1 + (r2 - r1) * t
            g = g1 + (g2 - g1) * t
            b = b1 + (b2 - b1) * t
            self.c.setFillColorRGB(r, g, b, 0.08)
            self.c.rect(0, i * 3, W, 4, fill=1, stroke=0)

        # Photo + title card
        card_y = H - 100
        if os.path.exists(PHOTO):
            self.c.drawImage(PHOTO, 50, card_y - 50, width=60, height=60, preserveAspectRatio=True, mask='auto')

        self.c.setFillColor(BLUE_DARK)
        self.c.setFont("Helvetica-Bold", 18)
        self.c.drawString(125, card_y - 15, "WHAT I'M LOOKING FOR")
        self.c.setFillColor(ORANGE)
        self.c.setFont("Helvetica", 10)
        self.c.drawString(125, card_y - 32, "IOANA DINU · E-COMMERCE SOLUTIONS ARCHITECT")
        y = card_y - 65

        y = self._body_text(
            "An agency / studio / freelance partner who delivers ecommerce builds as custom code projects to their clients (not as SaaS resale) and wants a proven backend to build on instead of starting from zero each time.",
            y
        )
        y -= 6
        y = self._body_text(
            "The ideal partner is already pitching custom-API / custom-code work to new clients — typically merchants who specifically want to own their stack rather than rent it. EU market focus (fiscal-compliance fields are built in; localization to any language is a content task).",
            y
        )
        y -= 14

        self.c.setFillColor(INK)
        self.c.setFont("Helvetica-Bold", 11)
        self.c.drawString(40, y, "Open to:")
        y -= 18

        open_to = [
            "Agency-partner referral — you bring the client; client contracts directly with me at standard rates; you receive recurring commission for the life of the contract; you keep all delivery-scope revenue (branding, configuration, content, project management) at your own rates",
            "Direct sale + onboarding for a merchant who finds me directly",
            "Migration projects off Shopify / Presta / Magento as a specific service line on top of either path",
            "Open to discussing other arrangements that fit your business model",
        ]
        for item in open_to:
            y = self._bullet(item, y)
        y -= 10

        y = self._body_text(
            "Happy to demo end-to-end on a video call — full flow takes ~20 minutes.",
            y, font_size=10
        )
        y -= 20

        # Contact info with brand colors
        self.c.setFillColor(BLUE)
        self.c.setFont("Helvetica", 10)
        self.c.drawString(42, y, "•")
        self.c.setFillColor(INK2)
        self.c.drawString(54, y, "ioana.dinu.it@gmail.com")
        self.c.setFillColor(BLUE)
        self.c.drawString(230, y, "•")
        self.c.setFillColor(INK2)
        self.c.drawString(242, y, "+40 757 019 416")
        self.c.setFillColor(BLUE)
        self.c.drawString(380, y, "•")
        self.c.setFillColor(INK2)
        self.c.drawString(392, y, "linkedin.com/in/ioana-dinu-it")

        self.c.showPage()

    def build(self):
        self.page_cover()
        self.page_2()
        self.page_3()
        self.page_4()
        self.page_5()
        self.page_6()
        self.page_7()
        self.page_8()
        self.page_9()
        self.page_10()
        self.page_11()
        self.page_12()
        self.c.save()
        print(f"PDF saved to: {OUTPUT}")


if __name__ == "__main__":
    pdf = PlatformOverviewPDF()
    pdf.build()
