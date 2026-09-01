# Putting the site on the internet

The site is already live. What follows fixes the two things that are wrong with it, then gets out of your way.

You do not need to understand any of it. Follow the steps in order.

---

## What you have

Inside the `site` folder:

**There are no folders any more.** Everything sits together in one place, which is what stops the upload going wrong again.

| | |
|---|---|
| `index.html` | The whole app, typefaces included. Never needs editing. |
| `songs.txt` | **The only file you will ever edit.** The list of slokams. |
| `00.m4a` … `54.m4a` | The 55 recordings. `00` is the dhyanam. |
| `icon-*.png` | The app icon for phone home screens |
| `sw.js` | Makes it work without internet |
| `manifest.webmanifest` | Lets it install like an app |
| `robots.txt` | Asks Google not to list the site |

Total: **33 MB.** Small.

`REVIEW-titles-and-tags.md` and this file are working notes for you, not part of the website. You can upload them or not — nothing links to them either way. I'd leave them out to keep things tidy.

---

# Part 1 — Shorten the address

Right now the site is at:

> `https://soundarya-lahari-by-swetha-balaji.github.io/SoundaryLahariBySwethaBalaji.github.io/`

That long form happens when the **repository name and the organisation name disagree**. You renamed the repository to `SoundaryLahariBySwethaBalaji.github.io`, but the organisation is still `Soundarya-Lahari-by-Swetha-Balaji`. Make them match and the address collapses to the short one.

1. Organisation → **Settings** → **General**
2. Scroll to the bottom → **Rename organization**
3. New name: `SoundaryLahariBySwethaBalaji`

That is the only change needed — the repository is already named correctly for it. Result:

> **https://soundarylahariByswethabalaji.github.io**

(GitHub writes it lowercase. Normal.)

> **One spelling check before you commit to it.** You've typed `Soundary` — the word is **Soundarya**, with the final *a*. `SoundaryaLahariBySwethaBalaji` is also free. If you want the correct spelling, use it for the organisation name here **and** rename the repository to `SoundaryaLahariBySwethaBalaji.github.io` so the two still match. Your call — but this is the moment, before anyone has the link.

---

# Part 2 — Fix the missing files

The 55 recordings uploaded, but they landed in the main folder rather than inside `audio/`, and the `fonts` and `icons` folders never uploaded at all. That is why nothing plays.

Rather than have you fight the uploader again, I've rebuilt the app to expect exactly what your repository already looks like: **recordings in the main folder, no subfolders anywhere.** The typefaces are now built into `index.html` itself, so there is no `fonts` folder to lose.

**Leave the 55 `.m4a` files exactly where they are.** Upload these seven files, replacing what's there:

- `index.html` — rebuilt, now expects the flat layout
- `manifest.webmanifest`
- `sw.js`
- `songs.txt`
- `icon-180.png`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` — these never made it before

Steps:

1. Repository → **Add file** → **Upload files**
2. In your `site` folder, select those files — they're all loose, no folders involved
3. Drag them across → **Commit changes**

GitHub replaces the older versions automatically. `index.html` is about 370 KB now because the typefaces live inside it; that is expected.

Wait a minute, then reload the site. The slokams will play.

---

# Part 3 — Turn on two-factor authentication

If you haven't already. Your account is the only key to the site.

1. Click your photo, top right → **Settings**
2. Left side → **Password and authentication**
3. **Enable two-factor authentication** — an app like Google Authenticator is easiest
4. **Save the recovery codes it gives you.** Screenshot them, email them to yourself, write them on paper. If you lose your phone without these, you lose the account and the site with it.

---

# Part 4 — Add your everyday account as an owner

This is what means you never sign in and out again.

1. Organisation → **People** → **Invite member**
2. Type your everyday GitHub username, and set the role to **Owner**
3. Sign in as yourself and accept — the invitation also arrives by email

From here on you upload recordings and edit `songs.txt` as **yourself**. Owner, rather than Member, is what lets you change settings later without switching accounts.

**Two bits of tidying, once that's done.** Swetha can be added the same way as a **Member**, if you ever want her uploading her own recordings — she'd never need your password. And the leftover empty `LearnSoundaryaLahari` personal account can be deleted, but only *after* your everyday account is an Owner here, or you'll lock yourself out of the organisation.

---

# Part 5 — Check it

Open the address on your phone.

- All 55 slokams listed, starting with **Dhyanam Slokam**
- Tap one — **it plays**
- Drag the **laya** slider — it slows down, and Swetha's voice stays natural rather than going deep
- Tap **Save all for offline**, wait for it to finish, then turn on aeroplane mode and reload. It should still work.

**Put it on your home screen.** On iPhone: Share button → *Add to Home Screen*. On Android: the three dots → *Install app*. It opens like a real app, with the yantra as its icon.

Then send the link to your students on WhatsApp.

---

# Everyday — Swetha shares slokam 55

Two minutes, and your phone is fine for it.

**First, the recording**

1. Save the file. Rename it `55.m4a`. Nothing else — no title in the filename.
2. Go to your repository. There are no folders — everything is in the one place.
3. **Add file** → **Upload files** → choose `55.m4a` → **Commit changes**.

**Then the list**

4. Go back to the repository's main page. Tap **songs.txt**.
5. Tap the **pencil** icon.
6. Go to the bottom and add one line:

   ```
   55 |  | 
   ```

   Or with a title and tags, once Swetha has given them to you:

   ```
   55 | Devi bhagavati | important, anxiety
   ```
7. **Commit changes**.

Wait a minute and refresh the site. Done.

Students who have the app on their home screen will see the new slokam next time they open it with internet on.

**The numbering rule, which is the only thing that trips people up:** slokams 1 to 9 are `01.m4a` to `09.m4a`, with the zero. From 10 on, no zero. The dhyanam is `00.m4a`.

---

# Everyday — adding titles and tags

Same as above, steps 4 to 7. Edit `songs.txt`, commit, done.

A line is: **number | title | tags**

```
22 | Bhavani tvam dase | important, career
```

- Leave the title empty and the page says *Slokam 22*. That's fine and looks clean.
- Tags are comma separated. Type a new word and a new tab appears on the site by itself. Delete the last line using a word and the tab goes away.
- Spell tags identically every time. `eyesight` and `Eyesight` make two separate tabs.
- **Order on the page follows the order of the lines.** To move a slokam up, move its line up.
- **Don't tag the dhyanam or Slokam 01 just to get them to the top of a theme.** The site already puts them at the head of every playlist. Tag them only if they truly belong to that theme.

---

# When something goes wrong

**A slokam won't play — the player says "Can't find…"**
The file name and the number don't match. Check the repository for the exact spelling. Nine times out of ten it's the leading zero: `7.m4a` instead of `07.m4a`.

**I edited songs.txt and the site looks the same**
Wait a full minute — GitHub takes a moment to rebuild — then reload. On a phone, close the tab completely and reopen. If you've added it to your home screen, close the app fully and reopen it with internet on.

**The site shows "three sample slokams"**
You're opening `index.html` from your computer instead of from the web address. Use the `github.io` address.

**Nothing plays after uploading a batch of recordings**
Check they went into the repository itself and not into a folder. Everything lives together in one place — `index.html`, `songs.txt` and all the `.m4a` files side by side. If a `site` or `audio` folder has appeared, open it, and re-upload those files to the main level.

**Settings → Pages doesn't offer a branch**
No files uploaded yet, or the upload didn't commit. Do Part 4 again.

**Offline isn't working**
It needs one visit with internet first, and it only works on the real web address, never from a file on your computer.

---

# Later, if you want it — a custom domain

Not needed. Your `github.io` address works forever, free, with HTTPS.

If you do want something like `soundaryalahari.com`, it's about $11 a year from a registrar such as Porkbun — check the price at checkout rather than trusting this number. Pointing it at the site takes five minutes in Settings → Pages → Custom domain, and the free HTTPS follows automatically. Nothing else changes.

Get the spelling right: **Lahari**, लहरी, "waves". *Lahiri* is a Bengali surname.

---

# Two things worth knowing

**Uploading is permanent, in a way that matters.** GitHub keeps the history of everything ever uploaded. If Swetha ever wants a recording taken down, deleting the file removes it from the site but not from that history. That needs a proper cleanup — ask me and I'll walk you through it. Worth knowing before you upload rather than after.

**This is now your backup.** Those 55 recordings existed only on your phone. Once they're on GitHub they're on GitHub's servers too, and you can download the whole set again at any time with the green **Code** button → **Download ZIP**.
