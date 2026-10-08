# Sorvibank — how to build with it

Sorvibank is an outdoor city quest game ("сорви куш": the first player to find a hidden code and enter it wins a cash prize). The UI is in **Russian**, uses the **Roboto** font, and keeps a small palette: brand yellow `#ffd544` for primary actions and accents, near-black text and outlines, white or light-grey (`#f6f7f8`, `#f9f9f9`) surfaces, a dark `#292929` header bar, and blue links `#126df7`. Write all UI copy in Russian, e.g. «Войти», «Зарегистрироваться», «Личный кабинет».

## Setup: always wrap in `SorvibankProvider`

`SorvibankProvider` sets up the react-query client, an in-memory router and the sonner `<Toaster>`. Any component that uses links, forms or data (`Header`, `FirstScreen`, `LoginForm`, `RegistrationForm`, `RestoreForm`, `ResetForm`, `NotFound`, the profile screens) **throws without it**. Use one provider at the root of the design:

```jsx
const { SorvibankProvider, Header, Footer } = window.Sorvibank;
<SorvibankProvider initialPath="/">
  <Header />
  {/* page content */}
  <Footer />
</SorvibankProvider>
```

The screens call the real `/api/auth/*` backend. In a design there is no backend, so data-driven parts fall back to their logged-out or empty state (`Header` shows «Личный кабинет», `FirstScreen` shows «Войти»). `ProfileMain` needs a logged-in user and only renders a placeholder.

## Styling idiom

Components take **no style props**. Their look comes from their own CSS modules, so don't restyle them. The only hooks are `extraClass` (Button, Input, ErrorMessage), `size`/`expand` on `Button`, `bg` on `Input`/`DotLoader`, and `fill`/`width`/`height` on the `*Icon` components.

For your own layout glue, use the global classes and tokens in `styles.css`:

| Need | Use |
|---|---|
| Centered page column (1140px max, responsive) | `className="container"` |
| Spacing, steps of 4px | `p-N`, `pt-N`, `pb-N`, `pl-N`, `pr-N`, `m-N`, `mt-N`, `mb-N`, `ml-N`, `mr-N`, where N ∈ 1–10, 15, 20, 25, 30 (`mt-8` = 32px) |
| Font sizes | `var(--main-size-text)` 20px, `var(--small-size-text)` 15px, `var(--large--size-text)` 28px (note the double dash), `var(--title-section-font-size)` 50px for section titles |
| Spacing unit | `var(--offset-base-size)` = 4px |

Section titles in the landing are bold uppercase words with a short yellow underline («КАК», «ЕСЛИ», «ТО»). Reuse the existing sections (`Steps`, `Tiles`, `MapSection`, `Video`) rather than imitating them.

## Component map

- **Primitives:** `Button`, `Input`, `PasswordInput` (built-in show/hide toggle), `PhoneInput` (mask `+7 (999) 999-99-99`), `DotLoader` (use inside a `Button` for a loading state), `ErrorMessage` (`data={{message, errors:[{field,message}]}}`), `Modal` (`close` is required; renders through a portal over a grey overlay), `ProgressBarToast`.
- **Landing (full-width, no props):** `FirstScreen` (hero), `Header`, `Footer`, `Steps`, `Tiles`, `MapSection`, `Video`, `NotFound`.
- **Auth forms (no props, self-contained):** `LoginForm`, `RegistrationForm`, `RestoreForm`, `ResetForm`.
- **Profile:** `ChangePassword`, `Sessions`, `LogoutPage`, `ProfileMain`.
- **Icons:** 20 `*Icon` components such as `ProfileIcon`, `LockIcon` and `PhoneIcon` (props `fill`, `width`, `height`, as strings like `"24px"`).

Before using a component, read `components/<group>/<Name>/<Name>.prompt.md` and `<Name>.d.ts`. All global classes and tokens are in `styles.css` → `_ds_bundle.css`.

## Example

```jsx
const { SorvibankProvider, Input, PasswordInput, Button } = window.Sorvibank;
function JoinCard() {
  const [login, setLogin] = React.useState('');
  const [pass, setPass] = React.useState('');
  return (
    <SorvibankProvider>
      <div className="container mt-10" style={{ maxWidth: 420 }}>
        <h2 className="mb-7" style={{ fontSize: 'var(--large--size-text)' }}>Вход в игру</h2>
        <Input label="Логин" name="login" placeholder="email@email.ru" value={login} onChange={(e) => setLogin(e.target.value)} />
        <PasswordInput value={pass} onChange={(e) => setPass(e.target.value)} />
        <div className="mt-3"><Button type="submit" expand>Войти</Button></div>
      </div>
    </SorvibankProvider>
  );
}
```
