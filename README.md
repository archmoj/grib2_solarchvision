GRIB2-SOLARCHVISION is a desktop software application designed and
developed by [Mojtaba Samimi
(M.Arch)](https://www.linkedin.com/in/mojtaba-samimi-06178840) in the
[Processing](https://processing.org/) language. It is available for
`GNU/Linux`, `macOS`, and `Microsoft Windows`.

# Table of contents

-   [Copyright and license](#copyright-and-license)
-   [Installation](#installation)
    -   [Clone using SSH](#clone-using-ssh)
    -   [Clone using HTTPS](#clone-using-https)
    -   [Requirements](#requirements)
    -   [Before running the program](#before-running-the-program)
    -   [Run using Processing IDE](#run-using-processing-ide)
    -   [Run using command line](#run-using-command-line)
-   [Graphical User Interface](#graphical-user-interface)
-   [Additional resources](#additional-resources)

------------------------------------------------------------------------

# Copyright and license

The code and documentation are released under the [GPL
v2](https://github.com/archmoj/grib2_solarchvision/blob/master/LICENSE.md).

# Installation

## Clone using SSH

``` sh
git clone git@github.com:archmoj/grib2_solarchvision.git
```

or

``` sh
git clone git@github.com:archmoj/grib2_solarchvision.git --depth 1
```

## Clone using HTTPS

``` sh
git clone https://github.com/archmoj/grib2_solarchvision.git
```

or

``` sh
git clone https://github.com/archmoj/grib2_solarchvision.git --depth 1
```

## Requirements

[Processing v4](https://processing.org/download) must be installed, as
GRIB2_SOLARCHVISION is a Processing sketch.

In addition, `the grib library` should be installed in Processing `sketchbook` folder under `sketchbook/libraries/grib/library/<grib jar files>`.

To find your Processing `sketchbook` folder, open the Processing application, go to `File > Preferences` (or `Processing > Settings` on Mac), and look at the top for "Sketchbook location".

Finally, the [gif-animation](https://github.com/extrapixel/gif-animation) is required to be downloaded and installed in Processing `sketchbook` to allow GIF exports.

## Before running the program

You should adjust the `BaseFolder` variable inside `grib2_solarchvision.pde`.

``` java
String BaseFolder = "/home/solarch/org/grib2_solarchvision";
```

Also to your screen resolution you may need to scale initial values of following
variables and the size() function:
``` java

int SOLARCHVISION_H_Pixel = 750;
int SOLARCHVISION_W_Pixel = int(SOLARCHVISION_H_Pixel * 2.0);

float MessageSize =  12.0;

int SOLARCHVISION_A_Pixel = 0; //int(1.5 * MessageSize); // menu bar
int SOLARCHVISION_B_Pixel = int(3.0 * MessageSize); // 3D tool bar
int SOLARCHVISION_C_Pixel = int(3.0 * MessageSize); // command bar
int SOLARCHVISION_D_Pixel = int(7.5 * MessageSize); // time bar


size(1500, 912, P2D);
```

## Run using Processing IDE

The `grib2_solarchvision` sketch can be opened in the Processing IDE and
executed using the Play button.

## Run using command line

To compile and run the `grib2_solarchvision` sketch, adjust
`<PATH-TO-PROCESSING>` in the following command as needed.

Please note that the command must be executed from the parent directory
containing the `grib2_solarchvision` folder.

``` sh
<PATH-TO-PROCESSING>/processing-java --sketch=grib2_solarchvision --run
```


# Graphical User Interface

Once loaded the UI would look like this depending on the selected parameters:

<p align="center">
    <img src="https://raw.githubusercontent.com/archmoj/grib2_solarchvision/refs/heads/master//doc/images/viewport.jpg">
</p>



# Additional resources
## [BIM6D Presentation](https://www.dropbox.com/scl/fi/vyfqllzj7hnb3rhvpnwus/BatimentDurable_MojtabaSamimi_20171123.pdf?rlkey=lzpoqyu59vp8wb4qidqtradaw&e=1)
## [Presentation at Ouranos](https://www.dropbox.com/scl/fo/5r66ns7r9j0rezprwa567/ADuKLQ_qQo98gDnlqDQMXVY?dl=0&e=2&preview=SOLARCHVISION_2015_12_09_Ouranos.pdf&rlkey=0x1wzfy5dll3bvx6j9ltw96v6)
## [TU-Berlin book: Intelligent Design using Solar-Climatic Vision (Energy and Comfort Improvement in Architecture and Urban Planning using SOLARCHVISION)](https://depositonce.tu-berlin.de/items/c091139a-09cf-44c3-99a9-6adf59f7eaf8)
