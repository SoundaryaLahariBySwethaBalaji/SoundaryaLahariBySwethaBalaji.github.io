# Putting the site on the internet

Everything is built and tested. What follows is the part you do — about 20 minutes, once. After that, adding a new slokam takes two minutes from your phone.

You do not need to understand any of it. Follow the steps in order.

---

## What you have

Inside the `site` folder:

| | |
|---|---|
| `index.html` | The whole app. One file. Never needs editing. |
| `songs.txt` | **The only file you will ever edit.** The list of slokams. |
| `audio/` | 55 recordings — `00.m4a` (the dhyanam) through `54.m4a` |
| `fonts/` | The two typefaces, so the page needs no outside connections |
| `icons/` | The app icon for phone home screens |
| `sw.js` | Makes it work without internet |
| `manifest.webmanifest` | Lets it install like an app |
| `robots.txt` | Asks Google not to list the site |

Total: **33 MB.** Small.

`REVIEW-titles-and-tags.md` and this file are working notes for you, not part of the website. You can upload them or not — nothing links to them either way. I'd leave them out to keep things tidy.

---

# Part 1 — Rename the organisation

You've already made the organisation and the repository. Two renames put them in agreement, and the rest is uploading.

The organisation is currently `Soundarya-Lahari-by-Swetha-Balaji`, which would make a 41-character web address. Shorten it:

1. Organisation → **Settings** → **General**
2. Scroll to the bottom, find **Rename organization**
3. New name: `LahariWithSwetha`

> **Keep the pretty name.** The **Organization display name** field, higher up the same page, is separate — leave it reading *Soundarya Lahari by Swetha Balaji*. Only the short name becomes the address.

---

# Part 2 — Rename the repository to match

This is the step that decides your address. GitHub gives you the short root address only when **the repository name matches its owner's name**.

1. Repository → **Settings** → **General**
2. **Repository name** → change it to `LahariWithSwetha.github.io` → **Rename**

Which lands the site here:

> **https://lahariwithswetha.github.io**

(GitHub writes it in lowercase. Normal, nothing to fix.)

If the two names don't match, the site still works — just at `lahariwithswetha.github.io/whatever-the-repo-is-called/` instead. That's the only thing this step is protecting you from.

---

# Part 3 — Turn on two-factor authentication

Now, not later. Your account is the only key to the site.

1. Click your photo, top right → **Settings**
2. Left side → **Password and authentication**
3. **Enable two-factor authentication** — an app like Google Authenticator is easiest
4. **Save the recovery codes it gives you.** Screenshot them, email them to yourself, write them on paper. If you lose your phone without these, you lose the account and the site with it.

---

# Part 4 — Upload the files

Use a laptop for this part, on wifi. It's about 33 MB.

1. On the repository page, **Add file** → **Upload files**
2. Open your `site` folder on the computer.
3. Select everything inside it — `index.html`, `songs.txt`, `sw.js`, `manifest.webmanifest`, `robots.txt`, and the `audio`, `fonts` and `icons` folders. Ctrl+A works.
4. Drag all of it onto the GitHub page.

   **Drag the contents, not the `site` folder itself.** If you drag the folder, everything ends up one level too deep and nothing works.
5. Wait. The audio takes a minute or two.
6. Scroll down, click the green **Commit changes**.

If it stalls, do it in two goes: the loose files first, then the `audio` folder on its own.

**Check before moving on.** Your repository should list: `audio`, `fonts`, `icons`, `index.html`, `manifest.webmanifest`, `robots.txt`, `songs.txt`, `sw.js`. Click into `audio` and count — **55 files**, `00.m4a` straight through `54.m4a` with no gaps.

---

# Part 5 — Switch the website on

1. In your repository, click **Settings** (the tab along the top).
2. Left side, scroll down to **Pages**.
3. **Source** → **Deploy from a branch**.
4. Branch **main**, folder **/ (root)**.
5. Click **Save**.
6. Tick **Enforce HTTPS** if it isn't already. It may be greyed out for a few minutes — come back to it.

Wait about two minutes. Refresh the Settings → Pages screen and it will show:

> Your site is live at `https://lahariwithswetha.github.io/`

---

# Part 6 — Add your everyday account as an owner

This is what means you never sign in and out again.

1. Organisation → **People** → **Invite member**
2. Type your everyday GitHub username, and set the role to **Owner**
3. Sign in as yourself and accept — the invitation also arrives by email

From here on you upload recordings and edit `songs.txt` as **yourself**. Owner, rather than Member, is what lets you change settings later without switching accounts.

**Two bits of tidying, once that's done.** Swetha can be added the same way as a **Member**, if you ever want her uploading her own recordings — she'd never need your password. And the leftover empty `LearnSoundaryaLahari` personal account can be deleted, but only *after* your everyday account is an Owner here, or you'll lock yourself out of the organisation.

---

# Part 7 — Check it

Open that address on your phone.

- All 55 slokams listed, starting with **Dhyanam Slokam**
- Tap one — it plays
- Drag the **laya** slider — it slows down, and Swetha's voice stays natural rather than going deep
- Tap **Save all for offline**, wait for it to finish, then turn on aeroplane mode and reload. It should still work.

**Put it on your home screen.** On iPhone: Share button → *Add to Home Screen*. On Android: the three dots → *Install app* or *Add to Home screen*. It then opens like a real app, with the yantra as its icon.

Then send the link to your students on WhatsApp.

---

# Everyday — Swetha shares slokam 55

Two minutes, and your phone is fine for it.

**First, the recording**

1. Save the file. Rename it `55.m4a`. Nothing else — no title in the filename.
2. Go to your repository → click the **audio** folder.
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
The file name and the number don't match. Check `audio` for the exact spelling. Nine times out of ten it's the leading zero: `7.m4a` instead of `07.m4a`.

**I edited songs.txt and the site looks the same**
Wait a full minute — GitHub takes a moment to rebuild — then reload. On a phone, close the tab completely and reopen. If you've added it to your home screen, close the app fully and reopen it with internet on.

**The site shows "three sample slokams"**
You're opening `index.html` from your computer instead of from the web address. Use the `github.io` address.

**Everything is missing after uploading**
You dragged the `site` folder instead of what's inside it. Go to the repository, open the `site` folder that shouldn't be there, delete it, and upload again — contents only.

**Settings → Pages doesn't offer a branch**
No files uploaded yet, or the upload didn't commit. Do Part 4 again.

**Offline isn't working**
It needs one visit with internet first, and it only works on the real web address, never from a file on your computer.

---

# Later, if you want it — a custom domain

Not needed. `lahariwithswetha.github.io` works forever, free, with HTTPS.

If you do want something like `soundaryalahari.com`, it's about $11 a year from a registrar such as Porkbun — check the price at checkout rather than trusting this number. Pointing it at the site takes five minutes in Settings → Pages → Custom domain, and the free HTTPS follows automatically. Nothing else changes.

Get the spelling right: **Lahari**, लहरी, "waves". *Lahiri* is a Bengali surname.

---

# Two things worth knowing

**Uploading is permanent, in a way that matters.** GitHub keeps the history of everything ever uploaded. If Swetha ever wants a recording taken down, deleting the file removes it from the site but not from that history. That needs a proper cleanup — ask me and I'll walk you through it. Worth knowing before you upload rather than after.

**This is now your backup.** Those 55 recordings existed only on your phone. Once they're on GitHub they're on GitHub's servers too, and you can download the whole set again at any time with the green **Code** button → **Download ZIP**.
