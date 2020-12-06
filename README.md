# vac
Vendor Akeneo Collection (VAC) cutter

# Description
A JSON Document per line (VAC) Parsing Utility

This utility allows you to cut one or more object attributes, separated by a delimiter, from a vac file.  

What's a vac file, you ask? 

It is a text file that containes one or more JSON documents separated by a newline character.

# Usage

* Make sure you have node version 8+ installed and it is visible to /usr/bin/env.

* chmod 777 vac

```
usage: vac [-d " "] [-p properties,...] [filename]
-d, a delimiter, default: tab character
-p, a comma separated list of properties
filename, a Vendor Akeneo Collection (text file with a JSON doc per line)
```

# Examples

```
$ vac
usage: vac [-d " "] [-p properties,...] [filename]
-d, a delimiter, default: tab character
-p, a comma separated list of properties
filename, a Vendor Akeneo Collection (text file with a JSON doc per line)
```

If you specify no properties, it lists them:

```
$ vac sample.vac
Object Properties
-----------------
FileCreated
FileName
FileType
FileUpdated
Hash
Id
MfgId
MfgIdName
Size
code
imagePath
info
```

If you specify one or more properties, it cuts them from the file, separating by the specified delimiter (the tab character by default):

```
$ vac -p Id,Size sample.vac
F5803393-C642-4735-B915-000013540B55	22344
7485B3CB-33BB-4B31-80F8-00001437D84F	252156
33733AA9-D95B-4099-A21C-00001AE693F9	97318
C9466B52-7D88-4547-84ED-000026057894	90716
9B3DC000-37E1-4DDD-AC6A-00002AAE06C7	296329
875886F8-A4DD-4588-A57D-00003301B096	204220
B4B04102-1ACE-4A49-A684-0000530B336E	209335
B3024540-E6CA-44EA-A808-00005F350A45	75264
E342BB2E-A1D6-4ECF-9E99-000064F31D1C	32157
00FF0F5E-8E4D-4CCB-A458-000071A4FF85	179092
```

You can also pipe the vac output of one program into vac:

```
$ cat sample.vac | vac -p Id,FileCreated
F5803393-C642-4735-B915-000013540B55	2016-12-14T14:49:35.000Z
7485B3CB-33BB-4B31-80F8-00001437D84F	2015-10-13T11:16:28.000Z
33733AA9-D95B-4099-A21C-00001AE693F9	2015-05-07T07:51:34.000Z
C9466B52-7D88-4547-84ED-000026057894	2015-12-10T10:58:44.000Z
9B3DC000-37E1-4DDD-AC6A-00002AAE06C7	2020-07-20T16:41:25.000Z
875886F8-A4DD-4588-A57D-00003301B096	2019-02-19T11:07:53.000Z
B4B04102-1ACE-4A49-A684-0000530B336E	2020-05-05T07:28:07.000Z
B3024540-E6CA-44EA-A808-00005F350A45	2018-08-17T15:48:48.000Z
E342BB2E-A1D6-4ECF-9E99-000064F31D1C	2016-05-26T13:07:28.000Z
00FF0F5E-8E4D-4CCB-A458-000071A4FF85	2015-07-08T14:29:22.000Z
```
