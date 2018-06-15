from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String

Base = declarative_base()

class AARec(Base):
    __tablename__ = 'aa_rec'

    # core
    id = Column(Integer)
    aa = Column(String)
    beg_date = Column(DateTime)
    end_date = Column(DateTime)
    # contact info
    peren = Column(String)
    line1 = Column(String)
    line2 = Column(String)
    line3 = Column(String)
    city = Column(String)
    st = Column(String)
    zip = Column(String)
    ctry = Column(String)
    phone = Column(String)
    phone_ext = Column(String)
    ofc_add_by = Column(String)
    cass_cert_date = Column(DateTime)
    aa_no = Column(Integer, primary_key=True)
    cell_carrier = Column(String)
    opt_out = Column(String)

    def __repr__(self):
        return str(self.aa)

ENS_FIELDS = [
    'aa','beg_date','end_date','line1','line2','line3',
    'phone','phone_ext','cell_carrier','opt_out'
]

ENS_CODES = (
    'MIS1','MIS2','MIS3','ENS','ICE','ICE2'
)

MOBILE_CARRIER = (
    ("","---select---"),
    ("1","AT&T"),
    ("2","Verizon Wireless"),
    ("3","U.S Cellular"),
    ("4","Boost Mobile"),
    ("5","Cricket"),
    ("6","Sprint PCS"),
    ("7","T-Mobile"),
    ("8","Virgin Mobile"),
    ("9","Airpage"),
    ("10","Alaska Communication Systems"),
    ("11","Aliant"),
    ("12","Alltel"),
    ("13","American Messaging"),
    ("14","Ampd Mobile"),
    ("15","Appalachian Wireless"),
    ("16","Aquis Communications"),
    ("17","Arch"),
    ("18","AT&T (Legacy)"),
    ("19","ATS Beep"),
    ("20","Bell Canada"),
    ("21","Bluegrass Cellular"),
    ("22","Boost"),
    ("23","Capcom Pager (Thurston)"),
    ("24","Carolina West Wireless"),
    ("25","Cellcom"),
    ("26","Cellular One"),
    ("27","Cellular One (Alternate)"),
    ("28","Cellular One Illinois (Regional)"),
    ("29","Cellular South"),
    ("30","CellularOne of Northeast Pennsylvania"),
    ("31","CellularOne of SLO"),
    ("32","Centennial Wireless"),
    ("33","Chariton Valley Wireless Service"),
    ("34","Chat Mobility"),
    ("35","Cincinnati Bell Wireless"),
    ("36","Consumer Cellular"),
    ("37","Contact Wireless"),
    ("38","Cook Paging"),
    ("39","Cox Communications"),
    ("40","Credo Mobile"),
    ("41","Cricket (Alternate)"),
    ("42","Cricket (MMS)"),
    ("43","CVC Paging"),
    ("44","Dobson"),
    ("45","Edge Wireless"),
    ("46","Einstein Wireless"),
    ("47","Five Star Wireless"),
    ("48","GCI "),
    ("49","Hargray Wireless"),
    ("50","Helio"),
    ("51","Illinois Valley Cellular"),
    ("52","Immix/Keystone Wireless"),
    ("53","Indigo Wireless"),
    ("54","Inland Cellular "),
    ("55","iWireless"),
    ("56","Metro PCS"),
    ("57","Metrocall"),
    ("58","Mid-Tex Cellular"),
    ("59","NE Penn Telephone"),
    ("60","Net10"),
    ("61","Nex-Tech Wireless"),
    ("62","Nextel"),
    ("63","Northwest Missouri Cellular"),
    ("64","nTelos"),
    ("65","Panhandle Telephone"),
    ("66","Pioneer Telephone"),
    ("67","Plateau Telecommunications"),
    ("68","Pocket Communications"),
    ("69","Propage Pager"),
    ("70","Qwest"),
    ("71","RCS Wireless"),
    ("72","Revol Wireless"),
    ("73","Rogers Canada"),
    ("74","Rural Cellular Corporation"),
    ("75","Sasktel"),
    ("76","Schuylkill Mobile Fone"),
    ("77","Singtel"),
    ("78","SkyTel"),
    ("79","SouthernLINC"),
    ("80","Sprint PCS (Alternate)"),
    ("81","SunCom / Triton"),
    ("82","T-Mobile (Pre-Paid)"),
    ("83","Teletouch Paging"),
    ("84","Telus"),
    ("85","Thumb Cellular"),
    ("86","Tracfone"),
    ("87","Unicel"),
    ("88","United Wireless "),
    ("89","USA Mobility"),
    ("90","Verizon Wireless (Alternate)"),
    ("91","Viaero Wireless"),
    ("92","WCC"),
    ("93","WCS Communications"),
    ("94","West Central Wireless")
)

RELATIONSHIP = (
    ("","---select---"),
    ("PC","Parent"),
    ("HW","Husband/Wife"),
    ("GPGC","Grandparent"),
    ("SBSB","Sibling"),
    ("FRFR","Friend"),
    ("SOSO","Sighificant Other"),
    ("AUNN","Aunt/Uncle"),
    ("OTHR","Other")
)
