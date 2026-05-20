export abstract class Navbar {
  public isMenuCollapsed = true;

  closeMenu() {
    this.isMenuCollapsed = true;
  }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }
}
