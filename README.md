# ✂️ bgone

bgone is a bot that incorporates [remove.bg](https://www.remove.bg/)'s background removal API into Discord.

[🚀 Invite to Discord](https://discordapp.com/oauth2/authorize?client_id=539099364627316738&scope=bot&permissions=117760)

---

## 🙋 Help

```asciidoc
Avatar  :: Get your own avatar.
Trigger :: bgone avatar

= args =

@user   :: Get avatar from tagged user
```

```asciidoc
Recent  :: Get the most recent image from this channel.
Trigger :: bgone
```

```asciidoc
Image   :: Get an image from a message.
Trigger :: bgone <image attachment>
```

```asciidoc
Help    :: Get some help.
Trigger :: bgone help
```

```asciidoc
URL     :: Get an image from a URL.
Trigger :: bgone <url>

= args =

url     :: any valid image URL
```

---

## 🙅 Current limitations

- All images are auto resized to be within 625×400
- The bot is limited to a maximum of 50 API calls per month

---

## 👩‍💻 Usage

```bash
# dev
npm run dev
```

```bash
# live
pm2 start --name "bgone" npm -- run serve
```

---

💪🏻 powered by [Remove.bg](https://www.remove.bg/)
