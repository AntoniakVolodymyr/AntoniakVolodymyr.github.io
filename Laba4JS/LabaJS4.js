const SortingLibrary = {
    swap(arr, i, j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    },

    bubbleSort(arr, ascending = true) {
        let comparisons = 0, swaps = 0;
        let len = arr.length;
        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - 1 - i; j++) {
                if (arr[j] === undefined || arr[j + 1] === undefined) continue;
                comparisons++;
                if ((ascending && arr[j] > arr[j + 1]) || (!ascending && arr[j] < arr[j + 1])) {
                    this.swap(arr, j, j + 1);
                    swaps++;
                }
            }
        }
        console.log(`Bubble Sort - К-сть порівнянь: ${comparisons} \n К-сть переміщень: ${swaps}`);
    },

    selectionSort(arr, ascending = true) {
        let comparisons = 0, swaps = 0;
        let len = arr.length;
        for (let i = 0; i < len - 1; i++) {
            let minMaxIdx = i;
            for (let j = i + 1; j < len; j++) {
                if (arr[j] === undefined) continue;
                comparisons++;
                if ((ascending && arr[j] < arr[minMaxIdx]) || (!ascending && arr[j] > arr[minMaxIdx])) {
                    minMaxIdx = j;
                }
            }
            if (minMaxIdx !== i) {
                this.swap(arr, i, minMaxIdx);
                swaps++;
            }
        }
        console.log(`Selection Sort - К-сть порівнянь: ${comparisons} \n К-сть переміщень: ${swaps}`);
    },

    insertionSort(arr, ascending = true) {
        let comparisons = 0, swaps = 0;
        let len = arr.length;
        for (let i = 1; i < len; i++) {
            let key = arr[i];
            if (key === undefined) continue;
            let j = i - 1;
            while (j >= 0 && ((ascending && arr[j] > key) || (!ascending && arr[j] < key))) {
                if (arr[j] === undefined) {
                    j--;
                    continue;
                }
                comparisons++;
                arr[j + 1] = arr[j];
                swaps++;
                j--;
            }
            arr[j + 1] = key;
        }
        console.log(`Insertion Sort - К-сть порівнянь: ${comparisons} \n К-сть переміщень: ${swaps}`);
    },

    shellSort(arr, ascending = true) {
        let comparisons = 0, swaps = 0;
        let len = arr.length;
        let gap = Math.floor(len / 2);
        while (gap > 0) {
            for (let i = gap; i < len; i++) {
                let temp = arr[i];
                let j = i;
                while (j >= gap && ((ascending && arr[j - gap] > temp) || (!ascending && arr[j - gap] < temp))) {
                    comparisons++;
                    arr[j] = arr[j - gap];
                    swaps++;
                    j -= gap;
                }
                arr[j] = temp;
            }
            gap = Math.floor(gap / 2);
        }
        console.log(`Shell Sort - К-сть порівнянь: ${comparisons} \n К-сть переміщень: ${swaps}`);
    },

    quickSort(arr, ascending = true, left = 0, right = arr.length - 1) {
        if (left >= right) return;
        let pivot = arr[Math.floor((left + right) / 2)];
        if (pivot === undefined) return;
        let index = this.partition(arr, left, right, pivot, ascending);
        this.quickSort(arr, ascending, left, index - 1);
        this.quickSort(arr, ascending, index, right);
    },

    partition(arr, left, right, pivot, ascending) {
        let comparisons = 0, swaps = 0;
        while (left <= right) {
            while ((ascending && arr[left] < pivot) || (!ascending && arr[left] > pivot)) {
                left++;
                comparisons++;
            }
            while ((ascending && arr[right] > pivot) || (!ascending && arr[right] < pivot)) {
                right--;
                comparisons++;
            }
            if (left <= right) {
                this.swap(arr, left, right);
                swaps++;
                left++;
                right--;
            }
        }
        console.log(`Quick Sort Partition - К-сть порівнянь: ${comparisons} \n К-сть переміщень: ${swaps}`);
        return left;
    }
