---

title: "How I Recovered My Kali + Windows Dual Boot After a BIOS Update Broke GRUB"
date: 2025-11-07
draft: false
tags: ["kali-linux", "windows", "grub", "uefi", "dualboot", "boot-repair"]
description: "A complete step-by-step guide to restoring GRUB after a BIOS update removes Kali Linux from boot menu. No data loss. Detailed troubleshooting walkthrough."
keywords: ["restore grub", "kali dual boot", "windows grub missing", "fix bootloader", "uefi boot repair", "kali windows dualboot fix"]
ShowToc: true
-------------

##  The Situation

I woke up one fine day, powered on my laptop, expecting the usual **GRUB menu** where I choose between **Kali Linux** and **Windows 11**. But instead, the system **booted straight into Windows**.

No GRUB. No Kali. No mercy.

I opened my BIOS boot menu hoping to manually select Kali, but the only things listed were:

```
Windows Boot Manager
EFI PXE Network (which I don't use)
```

That’s when I realized: **The BIOS update I recently installed wiped my GRUB boot entry.**

My data was still there — just the bootloader had vanished.

---

## 🧠 Understanding What Happened

Your system uses UEFI firmware to remember boot entries.
When you dual boot, it looks like this:

```
[UEFI Firmware]
      |
      v
+-----------------+
| GRUB Bootloader  |
+-----------------+
   |          |
   v          v
Kali Linux   Windows
```

But after the BIOS update:

```
[UEFI Firmware]
      |
      v
+------------------------+
| Windows Boot Manager   |
+------------------------+
           |
           v
       boots Windows only
```

GRUB wasn’t deleted — its **boot entry** was just erased.

---

## 💡 Goal

Restore the GRUB boot entry **without reinstalling anything**.
No formatting, no fresh installs — just fixing boot logic.

Final expected result:

```
GRUB Menu
├── Kali Linux
└── Windows Boot Manager
```

---

##  Step 1 — Boot Into Kali Live Mode

I created/brought my existing **Kali Live USB**, plugged it in, and rebooted.

I opened the boot menu and this is **important**:

<span style="color:red">I selected the entry that said `UEFI: <USB Name>` — NOT the legacy one.</span>

To confirm I really booted in UEFI mode:

```bash
ls /sys/firmware/efi
```

If this directory **exists**, I'm in UEFI mode ✅
If not → reboot and select UEFI USB entry ❌

---

##  Step 2 — Identify My Linux and EFI Partitions

I ran:

```bash
sudo fdisk -l
```

I found:

| Purpose               | Partition        |
| --------------------- | ---------------- |
| Kali Root Filesystem  | `/dev/nvme0n1p7` |
| Kali EFI Partition    | `/dev/nvme0n1p4` |
| Windows EFI Partition | `/dev/nvme0n1p1` |

<span style="color:red">It's critical to identify these correctly.</span>

---

## Step 3 — Mount Kali System and Enter It

I mounted my system like this:

```bash
sudo mount /dev/nvme0n1p7 /mnt
sudo mount /dev/nvme0n1p4 /mnt/boot/efi
for i in /dev /dev/pts /proc /sys /run; do sudo mount --bind $i /mnt$i; done
sudo chroot /mnt
```

At this point, I was **inside my installed Kali**.

---

## Step 4 — Reinstall GRUB

```bash
grub-install /dev/nvme0n1
update-grub
```

When `update-grub` ran, I got:

```
Found Windows Boot Manager on /dev/nvme0n1p1
```

Perfect.

---

## Step 5 — The Critical Part I Almost Missed

When I first tried to restore the boot entry, I got:

```
EFI variables are not supported on this system.
```

This means **EFI vars weren't mounted**, so I fixed it:

```bash
mount -t efivarfs efivarfs /sys/firmware/efi/efivars
```

<span style="color:red">Without this, `efibootmgr` WILL FAIL.</span>

---

##  Step 6 — Recreate the GRUB UEFI Boot Entry

```bash
efibootmgr -c -d /dev/nvme0n1 -p 4 -l "\EFI\kali\grubx64.efi" -L "Kali Linux"
```

Then I checked:

```bash
efibootmgr
```

I got:

```
Boot0003* Kali Linux
Boot0004* Windows Boot Manager
```

Beautiful.

---

##  Step 7 — Make Kali (GRUB) Boot First

```bash
efibootmgr -o 0003,0004
```

This sets the boot order like:

```
1. Kali (GRUB)
2. Windows Boot Manager
```

---

## Step 8 — Reboot (Without USB)

```bash
exit
reboot
```

GRUB appeared.
My dual boot was fully back.

---

## ✅ Final State

```
[UEFI Firmware]
       |
       v
+-----------------+
| GRUB Bootloader |
+-----------------+
   |          |
   v          v
Kali Linux   Windows
```

---

## 🛡️ Bonus: Prevent This Happening Again

Disable Windows Fast Startup (this prevents EFI entries from being overwritten):

```
Control Panel → Power Options → Choose what the power buttons do → Disable Fast Startup
```

---

##  Conclusion

I didn’t reinstall anything.
I didn’t lose data.
I didn’t break Windows.

I simply **restored GRUB** the correct way.

If your system suddenly forgets about Linux — don’t panic.
Your data is still there.
You just need to remind your motherboard that Kali exists 😉

Happy hacking 🐉💻
