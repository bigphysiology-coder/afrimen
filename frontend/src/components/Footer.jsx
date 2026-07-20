import { Link } from 'react-router-dom'
import { InstagramIcon, PinterestIcon, XIcon } from '../data/icons'

export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap foot-grid">
        <div className="foot-about">
          <div className="foot-logo">
            AFRIMEN
          </div>
          <p>Considered menswear built from a tailor's notebook, not a trend board. Cut to measure, made to last, mended when it needs mending.</p>
          <div className="foot-social">
            <a href="https://instagram.com/afrimen" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
            <a href="https://pinterest.com/afrimen" target="_blank" rel="noopener noreferrer" aria-label="Pinterest"><PinterestIcon /></a>
            <a href="https://x.com/afrimen" target="_blank" rel="noopener noreferrer" aria-label="X"><XIcon /></a>
          </div>
        </div>
        <div>
          <h5>Quick Links</h5>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop All</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h5>Customer Service</h5>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/faq">Returns &amp; Exchanges</Link></li>
            <li><Link to="/faq">Shipping Info</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">Size Guide</Link></li>
          </ul>
        </div>
        <div>
          <h5>Get in Touch</h5>
          <ul>
            <li>Ikeja, Lagos</li>
            <li className="mono">+234 1 227 9480</li>
            <li>hello@afrimen.ng</li>
            <li>{'Mon\u2013Fri, 9:00\u201318:00 WAT'}</li>
          </ul>
        </div>
      </div>
      <div className="wrap foot-bottom">
        <span>&copy; 2026 Afrimen Ltd. All rights reserved.</span>
        <div className="pay-icons">
          <span>VISA</span><span>MASTERCARD</span><span>AMEX</span><span>PAYPAL</span><span>APPLE PAY</span>
        </div>
        <div className="legal-links">
          <Link to="/faq">Privacy</Link><Link to="/faq">Terms</Link><Link to="/faq">Cookies</Link>
        </div>
      </div>
    </footer>
  )
}
